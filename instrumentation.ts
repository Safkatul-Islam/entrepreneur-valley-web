// Next.js instrumentation hook. Runs once per runtime when the app boots.
// We use it to load the appropriate Sentry config based on which runtime
// is active (Node for API routes / SSR, Edge for middleware).

import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Capture errors from Next.js's nested React Server Component error boundaries
// (returned to Sentry as request errors with full route context).
export const onRequestError = Sentry.captureRequestError;
