import { NextResponse, type NextRequest } from "next/server";
import { registrationSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";

  const rl = rateLimit(`register:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = registrationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid input",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const userAgent = req.headers.get("user-agent") ?? null;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("registrations").insert({
      event_slug: "sharks-valley",
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
        return NextResponse.json(
          {
            ok: false,
            error:
              "Looks like this email is already registered. Check your inbox.",
          },
          { status: 409 }
        );
      }
      console.error("[register] supabase error", error);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Try again shortly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register] unexpected", err);
    // If Supabase env missing in preview, surface a helpful message
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json(
      { ok: false, error: msg },
      { status: 500 }
    );
  }
}
