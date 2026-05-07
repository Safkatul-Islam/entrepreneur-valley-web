import { Resend } from "resend";
import {
  RegistrationConfirmation,
} from "@/emails/RegistrationConfirmation";
import {
  AdminNotification,
  type AdminNotificationProps,
} from "@/emails/AdminNotification";

/**
 * Server-only email client. Lazily instantiated so missing env vars don't
 * crash the import; the API route checks for misconfiguration explicitly.
 */
let cached: Resend | null = null;

function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

export interface RegistrantContext {
  to: string;
  fullName: string;
  phone?: string | null;
  school: string;
  yearMajor: string;
  motivation?: string | null;
  dietary?: string | null;
  accessibility?: string | null;
  eventSlug: string;
}

const FROM_DEFAULT = "Entrepreneur Valley <noreply@entrepreneursvalley.club>";

/**
 * Send registrant confirmation + admin notification. Uses Promise.allSettled
 * so an email failure never 500s the registration request — the row is
 * already in Supabase and the user has a success state. Errors are logged
 * server-side and visible in Sentry once that's wired up.
 */
export async function sendRegistrationEmails(
  ctx: RegistrantContext
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      console.error("[email] RESEND_API_KEY missing in production");
    }
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? FROM_DEFAULT;
  const adminList = (process.env.ADMIN_NOTIFICATION_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://entrepreneursvalley.club";
  const discordInvite =
    process.env.NEXT_PUBLIC_DISCORD_INVITE ??
    "https://discord.gg/cMkdZQGCSE";

  const adminPayload: AdminNotificationProps = {
    fullName: ctx.fullName,
    email: ctx.to,
    phone: ctx.phone ?? null,
    school: ctx.school,
    yearMajor: ctx.yearMajor,
    motivation: ctx.motivation ?? null,
    dietary: ctx.dietary ?? null,
    accessibility: ctx.accessibility ?? null,
    eventSlug: ctx.eventSlug,
    submittedAt: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
  };

  const sends: Promise<unknown>[] = [
    resend.emails.send({
      from,
      to: ctx.to,
      subject: "You're registered for Sharks' Valley",
      react: RegistrationConfirmation({
        fullName: ctx.fullName,
        discordInvite,
        siteUrl,
      }),
    }),
  ];

  if (adminList.length > 0) {
    sends.push(
      resend.emails.send({
        from,
        to: adminList,
        subject: `New registration: ${ctx.fullName}`,
        react: AdminNotification(adminPayload),
        replyTo: ctx.to,
      })
    );
  } else if (process.env.NODE_ENV === "production") {
    console.warn("[email] ADMIN_NOTIFICATION_EMAILS not set — no admin email sent");
  }

  const results = await Promise.allSettled(sends);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("[email] send failed", r.reason);
    }
  }
}
