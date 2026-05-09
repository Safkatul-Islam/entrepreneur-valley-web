// Sentry edge-runtime init. Loaded by instrumentation.ts when middleware /
// edge routes run. Currently we have no middleware, but keep this wired for
// future-proofing.

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
  environment: process.env.VERCEL_ENV ?? "development",
});
