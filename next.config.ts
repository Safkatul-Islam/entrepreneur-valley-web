import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Security headers applied to every response. CSP is the load-bearing one:
 * it explicitly lists the third parties we actually use (Turnstile, Vercel
 * Analytics if enabled later, Sentry ingest) and blocks everything else,
 * mitigating XSS even if user-generated content sneaks past Zod.
 *
 * 'unsafe-inline' on style-src is needed for Tailwind/inline component
 * styles. 'unsafe-eval' on script-src is needed for Next.js dev mode and
 * Framer Motion in some cases — accept this trade-off; the static-analysis
 * payoff is small compared to the breakage risk.
 *
 * Sentry events tunnel through our own /monitoring route (same-origin), so
 * CSP doesn't need to whitelist sentry.io and ad-blockers can't kill telemetry.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://*.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co https://*.public.blob.vercel-storage.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: csp,
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org + project slugs. Both come from env so they can stay out of
  // git. When unset (e.g. local builds without auth), the plugin skips
  // source-map upload but runtime instrumentation still works.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Suppress noisy build logs locally; keep them in CI/Vercel for diagnosis.
  silent: !process.env.CI,

  // Upload more client chunks for better stack traces.
  widenClientFileUpload: true,

  // Don't ship source maps publicly; delete them after Sentry upload so
  // the prod bundle doesn't expose unminified code.
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Replaces deprecated top-level `disableLogger` and `automaticVercelMonitors`.
  webpack: {
    treeshake: {
      // Drop the Sentry SDK debug logger from the client bundle in prod.
      removeDebugLogging: true,
    },
    // Wire automatic Vercel Cron monitoring (no-op since we have no cron
    // jobs on Vercel — our cron lives in Supabase. Harmless to enable.)
    automaticVercelMonitors: true,
  },
});
