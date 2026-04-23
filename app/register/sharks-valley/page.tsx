import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register for Sharks' Valley",
  description:
    "Reserve your seat at the biggest student pitch night of the semester.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-[100svh] bg-[color:var(--color-paper)]">
      <div className="container-page py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)] hover:text-ink transition-colors"
        >
          <span aria-hidden>←</span> Back to Entrepreneur Valley
        </Link>
      </div>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 80% 0%, color-mix(in oklab, var(--color-brand-sharks) 18%, transparent), transparent 60%)",
          }}
        />
        <div className="container-page pb-10 md:pb-16">
          <div className="eyebrow">Registration</div>
          <h1 className="display-xl mt-4 text-balance">
            Sharks&rsquo;{" "}
            <em className="not-italic text-[var(--color-brand-sharks)]">
              Valley.
            </em>
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)]">
            Grab your seat. Details will land in your inbox — expect
            logistics, schedule, and how to cheer on the founders.
          </p>
        </div>
      </section>

      <section className="container-page pb-28 md:pb-40">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] bg-white/70 backdrop-blur-sm border border-[color:var(--color-line)] p-8 md:p-12 shadow-[var(--shadow-soft)]">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
