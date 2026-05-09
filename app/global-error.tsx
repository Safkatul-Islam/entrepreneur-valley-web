"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

/**
 * App Router global error boundary. Catches React rendering errors that bubble
 * past page-level `error.tsx` boundaries and reports them to Sentry. Required
 * for Sentry to capture rendering errors (App Router doesn't expose them
 * through `onRequestError` — they only surface in this boundary).
 *
 * statusCode is hardcoded to 0 because the App Router doesn't expose status
 * codes for client-side render failures.
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
