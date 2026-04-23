type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Very small in-memory rate limiter. Adequate for a single-region Vercel
 * deployment at club-website scale. Swap for Upstash Redis if this ever
 * runs in multiple regions or needs durability across deploys.
 */
export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60 * 60 * 1000 } = {}
): { ok: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (b.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((b.resetAt - now) / 1000),
    };
  }

  b.count += 1;
  return { ok: true, remaining: limit - b.count, retryAfter: 0 };
}
