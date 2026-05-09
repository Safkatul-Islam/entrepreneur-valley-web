// Sentry client-side init. Loaded automatically by Next.js on every page.
// Errors thrown in React components, fetch failures, etc. flow through here.

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Sample 10% of transactions for performance monitoring. Bump if you want
  // more visibility; 10% is plenty at club traffic.
  tracesSampleRate: 0.1,

  // Don't sample replays in steady state — they cost the most. Always record
  // sessions where an error happens, since those are the ones we'd want.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  // Mask any text/inputs in replays so PII (registration form fields)
  // never leaves the browser.
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],

  // Don't send PII Sentry might infer from cookies/headers.
  sendDefaultPii: false,

  // Useful tag for filtering: production vs preview deploys.
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
