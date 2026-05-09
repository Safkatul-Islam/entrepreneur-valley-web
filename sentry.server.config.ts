// Sentry server-side init. Loaded by instrumentation.ts when the Node runtime
// boots (API routes, server components, server actions).

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
  environment: process.env.VERCEL_ENV ?? "development",
});
