import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Entrepreneur Valley collects, uses, and protects information from event registrations.",
};

const ADMIN_EMAILS = (process.env.ADMIN_NOTIFICATION_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CONTACT_EMAIL = ADMIN_EMAILS[0] ?? "mdsafkatul.stu24@gmail.com";

const LAST_UPDATED = "May 5, 2026";

export default function PrivacyPage() {
  return (
    <main className="container-page py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="eyebrow text-[var(--color-brand-primary)]">
          Privacy
        </div>
        <h1 className="display-lg mt-4">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[color:var(--color-muted)]">
          Last updated {LAST_UPDATED}
        </p>

        <div className="prose prose-neutral mt-12 max-w-none text-[color:var(--color-ink-soft)] leading-relaxed">
          <Section title="Who we are">
            <p>
              Entrepreneur Valley is a student-run club at Santa Monica
              College. This site (entrepreneursvalley.club) is operated by
              the club&rsquo;s board to manage event registrations and
              communications.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              When you register for an event on this site, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name, email, and (optional) phone number</li>
              <li>Your school and year/major</li>
              <li>
                Optional details you choose to share (dietary restrictions,
                accessibility needs, motivation for attending)
              </li>
              <li>
                Technical metadata: your IP address and browser user agent
                at the time of submission, retained for 30 days for abuse
                prevention then automatically purged
              </li>
            </ul>
          </Section>

          <Section title="Why we collect it">
            <p>
              Solely to plan and run the event you registered for, contact
              you about logistics, and prevent abuse of the registration
              form. We do not sell, rent, or share your information with
              advertisers, sponsors, or any third party for marketing.
            </p>
          </Section>

          <Section title="Where it&rsquo;s stored">
            <p>
              Registration data is stored in a private Supabase (Postgres)
              database hosted in the United States. Access is restricted to
              the two club officers who run this website. The database is
              not publicly readable; the API only accepts inserts and
              never returns existing records to the public.
            </p>
            <p>
              Confirmation emails are sent through Resend. Bot-protection
              challenges are handled by Cloudflare Turnstile. Hosting is
              provided by Vercel. None of these vendors receive your
              registration data for their own use.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Registration records are retained while you are an active
              participant in club events and for a reasonable period
              afterward for our own records. IP and user-agent metadata is
              automatically nulled out 30 days after submission. You can
              request deletion of your record at any time by emailing us at
              the address below.
            </p>
          </Section>

          <Section title="Your choices">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Access:</strong> Ask what we have on file for you.
              </li>
              <li>
                <strong>Correction:</strong> Ask us to fix any inaccurate
                information.
              </li>
              <li>
                <strong>Deletion:</strong> Ask us to delete your record.
              </li>
              <li>
                <strong>Unsubscribe:</strong> Reply to any event email and
                ask to be removed; we&rsquo;ll honor it within a few days.
              </li>
            </ul>
          </Section>

          <Section title="Security">
            <p>
              We follow standard practices: encrypted connections (HTTPS
              everywhere), credentials managed in a password manager with
              two-factor authentication required for all backend access,
              rate limiting and CAPTCHA on the registration form, and
              database-level access controls so no public reads of
              registration data are possible. No system is perfectly secure;
              if a breach affects you, we will notify you promptly.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or your data? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--color-brand-primary)] underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update this policy as the club&rsquo;s practices
              evolve. Material changes will be communicated to anyone with
              an active registration on file.
            </p>
          </Section>
        </div>

        <div className="mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-[color:var(--color-paper)] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-[family-name:var(--font-display)] text-ink mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-base">{children}</div>
    </section>
  );
}
