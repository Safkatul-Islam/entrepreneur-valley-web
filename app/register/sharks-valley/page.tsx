import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register for Sharks' Valley",
  description:
    "Reserve your seat at the biggest student pitch night of the semester.",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 50% at 70% 10%, color-mix(in oklab, var(--color-brand-sharks-light) 30%, transparent), transparent 50%), radial-gradient(90% 60% at 20% 90%, color-mix(in oklab, var(--color-brand-sharks) 60%, black), transparent 50%), linear-gradient(175deg, var(--color-brand-sharks-dark) 0%, #071e24 50%, var(--color-brand-sharks-dark) 100%)",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div
        aria-hidden
        className="fixed right-[-8%] top-[5%] -z-10 opacity-[0.04] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={500}
          height={500}
          className="w-[min(50vw,420px)] h-auto"
        />
      </div>

      <div className="container-page pt-8 md:pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-brand-cream)]/50 hover:text-[color:var(--color-brand-cream)] transition-colors"
        >
          <span aria-hidden>&larr;</span> Back to Entrepreneur Valley
        </Link>
      </div>

      <section className="container-page pb-6 md:pb-10">
        <div className="eyebrow text-[color:var(--color-brand-cream)]/40">
          Registration
        </div>
        <h1 className="display-lg mt-3 text-balance text-[color:var(--color-brand-cream)]">
          Sharks&rsquo;{" "}
          <em className="not-italic text-[var(--color-brand-accent)]">
            Valley.
          </em>
        </h1>
        <p className="mt-4 max-w-lg text-base md:text-lg leading-relaxed text-[color:var(--color-brand-cream)]/60">
          Whether you&rsquo;re in the audience or on stage &mdash; it starts
          here. Pick your role and we&rsquo;ll handle the rest.
        </p>
      </section>

      <section className="container-page pb-24 md:pb-36">
        <div className="mx-auto max-w-4xl">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
