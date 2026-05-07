/**
 * Cloudflare Turnstile server-side verification.
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * The widget on the client produces a single-use token. We POST it (with the
 * shared secret + the requester's IP) to Cloudflare's siteverify endpoint and
 * trust the boolean `success` field plus the action/hostname assertions.
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  "error-codes"?: string[];
}

export interface TurnstileVerifyResult {
  ok: boolean;
  reason?: string;
}

/**
 * Verify a Turnstile token against Cloudflare. Returns ok=false with a reason
 * when verification fails. Logs the actual error codes server-side.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Dev mode: if no secret is configured, allow through. Production deploys
    // MUST set this env var (verified via the launch checklist).
    if (process.env.NODE_ENV !== "production") {
      return { ok: true };
    }
    console.error("[turnstile] TURNSTILE_SECRET_KEY missing in production");
    return { ok: false, reason: "verification-misconfigured" };
  }

  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "local") {
    body.set("remoteip", remoteIp);
  }

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      // Cloudflare's endpoint is fast; keep the timeout tight.
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error("[turnstile] siteverify http error", res.status);
      return { ok: false, reason: "verification-failed" };
    }

    const json = (await res.json()) as SiteVerifyResponse;
    if (!json.success) {
      console.warn("[turnstile] verification rejected", json["error-codes"]);
      return { ok: false, reason: "challenge-failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[turnstile] siteverify threw", err);
    return { ok: false, reason: "verification-failed" };
  }
}
