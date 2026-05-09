import { NextResponse, type NextRequest } from "next/server";

/**
 * Sentry tunnel route. Same-origin proxy that forwards Sentry envelope
 * payloads from the browser SDK to Sentry's ingest endpoint.
 *
 * Why: Sentry's domain (*.ingest.sentry.io) is on most ad-blocker filter
 * lists. By tunneling through our own origin, blocker extensions can't
 * intercept telemetry. Also keeps Sentry out of our CSP allowlist.
 *
 * Reference: https://docs.sentry.io/platforms/javascript/troubleshooting/#using-the-tunnel-option
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Pin the project ID so this tunnel can only forward to OUR Sentry project.
// If an attacker tries to use our endpoint to relay envelopes for a different
// project (e.g. to burn through someone else's quota or anonymize attacks),
// we reject it.
const ALLOWED_PROJECT_IDS = new Set(["4511357250371584"]);

// Fallback DSN — used when the envelope header omits its own dsn (legitimate
// for some envelope types like sessions). We trust our server-configured DSN
// since it's the same project we'd accept anyway.
function getFallbackDsn(): string | null {
  return (
    process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN ?? null
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const envelope = await req.text();
    const headerLine = envelope.split("\n", 1)[0];
    if (!headerLine) {
      return new NextResponse("bad envelope", { status: 400 });
    }

    let header: { dsn?: string };
    try {
      header = JSON.parse(headerLine) as { dsn?: string };
    } catch {
      return new NextResponse("bad envelope header", { status: 400 });
    }

    // Per Sentry's envelope spec, the dsn field in the header is optional.
    // When absent, fall back to the server-configured DSN (same project).
    const dsnString = header.dsn ?? getFallbackDsn();
    if (!dsnString) {
      return new NextResponse("missing dsn", { status: 400 });
    }

    let dsn: URL;
    try {
      dsn = new URL(dsnString);
    } catch {
      return new NextResponse("invalid dsn", { status: 400 });
    }

    const projectId = dsn.pathname.replace(/^\/+/, "");
    if (!ALLOWED_PROJECT_IDS.has(projectId)) {
      return new NextResponse("project not allowed", { status: 403 });
    }

    const upstream = `https://${dsn.host}/api/${projectId}/envelope/`;
    const response = await fetch(upstream, {
      method: "POST",
      body: envelope,
      headers: { "Content-Type": "application/x-sentry-envelope" },
    });

    return new NextResponse(null, { status: response.status });
  } catch (e) {
    console.error("[sentry-tunnel] forwarding failed", e);
    return new NextResponse("tunnel error", { status: 500 });
  }
}
