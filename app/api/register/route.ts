import { NextResponse, type NextRequest } from "next/server";
import { registrationPayloadSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimitDb } from "@/lib/rate-limit-db";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendRegistrationEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_SLUG = "sharks-valley";
const RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };

interface ErrorResponse {
  ok: false;
  error: string;
  issues?: Record<string, string[] | undefined>;
}

interface SuccessResponse {
  ok: true;
}

function err(
  body: ErrorResponse,
  init: ResponseInit
): NextResponse<ErrorResponse> {
  return NextResponse.json(body, init);
}

function ok(): NextResponse<SuccessResponse> {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";

  // 1. Parse JSON early so honeypot + Zod can both run on it.
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return err({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // 2. Honeypot — silent reject. Bots that fill every field get an opaque 400.
  if (
    json &&
    typeof json === "object" &&
    "website" in json &&
    typeof (json as Record<string, unknown>).website === "string" &&
    ((json as Record<string, string>).website ?? "").length > 0
  ) {
    return err({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  // 3. Rate limit — DB-backed so it survives serverless cold starts.
  const rl = await rateLimitDb(`register:${ip}`, RATE_LIMIT);
  if (!rl.ok) {
    return err(
      { ok: false, error: "Too many submissions. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      }
    );
  }

  // 4. Zod validation — checks shape, lengths, formats, consent boolean,
  //    and that turnstileToken is present.
  const parsed = registrationPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return err(
      {
        ok: false,
        error: "Invalid input",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 5. Turnstile — verify against Cloudflare. This is the expensive check
  //    so it goes last among the gates.
  const turnstile = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstile.ok) {
    return err(
      { ok: false, error: "Verification failed. Refresh and try again." },
      { status: 400 }
    );
  }

  // 6. Insert into Supabase.
  const userAgent = req.headers.get("user-agent") ?? null;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("registrations").insert({
      event_slug: EVENT_SLUG,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      school: data.school,
      year_major: data.yearMajor,
      dietary: data.dietary || null,
      accessibility: data.accessibility || null,
      motivation: data.motivation || null,
      consent: data.consent,
      ip,
      user_agent: userAgent,
    });

    if (error) {
      // Unique violation on (event_slug, lower(email))
      if (error.code === "23505") {
        return err(
          {
            ok: false,
            error:
              "Looks like this email is already registered. Check your inbox.",
          },
          { status: 409 }
        );
      }
      console.error("[register] supabase error", error);
      return err(
        { ok: false, error: "Something went wrong. Try again shortly." },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("[register] unexpected", e);
    return err(
      { ok: false, error: "Something went wrong. Try again shortly." },
      { status: 500 }
    );
  }

  // 7. Send emails. Failures here don't fail the request — the registration
  //    is already saved, and the user gets a success state.
  await sendRegistrationEmails({
    to: data.email,
    fullName: data.fullName,
    phone: data.phone || null,
    school: data.school,
    yearMajor: data.yearMajor,
    motivation: data.motivation || null,
    dietary: data.dietary || null,
    accessibility: data.accessibility || null,
    eventSlug: EVENT_SLUG,
  });

  return ok();
}
