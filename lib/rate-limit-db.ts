import { getSupabaseAdmin } from "@/lib/supabase";

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number;
}

/**
 * Durable rate limiter backed by Postgres. Survives Vercel cold starts and
 * is correct across concurrent serverless invocations (uses SELECT FOR UPDATE
 * inside `public.check_rate_limit`).
 *
 * Falls open (returns ok=true) on infrastructure errors so a Supabase outage
 * doesn't take registrations down. Errors are logged server-side.
 */
export async function rateLimitDb(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): Promise<RateLimitResult> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: Math.ceil(windowMs / 1000),
    });

    if (error) {
      console.error("[rate-limit] rpc error", error);
      return { ok: true, retryAfter: 0 };
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row || typeof row.allowed !== "boolean") {
      console.error("[rate-limit] unexpected rpc shape", data);
      return { ok: true, retryAfter: 0 };
    }

    return {
      ok: row.allowed,
      retryAfter: typeof row.retry_after === "number" ? row.retry_after : 0,
    };
  } catch (err) {
    console.error("[rate-limit] unexpected", err);
    return { ok: true, retryAfter: 0 };
  }
}
