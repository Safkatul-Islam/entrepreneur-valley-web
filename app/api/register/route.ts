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
  init: ResponseInit,
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

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return err({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    json &&
    typeof json === "object" &&
    "website" in json &&
    typeof (json as Record<string, unknown>).website === "string" &&
    ((json as Record<string, string>).website ?? "").length > 0
  ) {
    return err({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  const rl = await rateLimitDb(`register:${ip}`, RATE_LIMIT);
  if (!rl.ok) {
    return err(
      { ok: false, error: "Too many submissions. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      },
    );
  }

  const parsed = registrationPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return err(
      {
        ok: false,
        error: "Invalid input",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const turnstile = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstile.ok) {
    return err(
      { ok: false, error: "Verification failed. Refresh and try again." },
      { status: 400 },
    );
  }

  const userAgent = req.headers.get("user-agent") ?? null;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("registrations").insert({
      event_slug: EVENT_SLUG,
      registration_type: "pitcher",
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      school: data.school,
      major: data.major,
      video_url: data.videoUrl,
      consent: data.consent,
      ip,
      user_agent: userAgent,
    });

    if (error) {
      if (error.code === "23505") {
        return err(
          {
            ok: false,
            error:
              "Looks like this email is already registered. Check your inbox.",
          },
          { status: 409 },
        );
      }
      console.error("[register] supabase error", error);
      return err(
        { ok: false, error: "Something went wrong. Try again shortly." },
        { status: 500 },
      );
    }
  } catch (e) {
    console.error("[register] unexpected", e);
    return err(
      { ok: false, error: "Something went wrong. Try again shortly." },
      { status: 500 },
    );
  }

  try {
    await sendRegistrationEmails({
      to: data.email,
      fullName: data.fullName,
      phone: data.phone || null,
      school: data.school,
      major: data.major,
      videoUrl: data.videoUrl,
      eventSlug: EVENT_SLUG,
    });
  } catch (e) {
    console.error("[register] sendRegistrationEmails failed", e);
  }

  return ok();
}
