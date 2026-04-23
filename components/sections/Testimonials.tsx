"use client";

import { TESTIMONIALS } from "@/content/testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonials() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[color:var(--color-brand-primary-dark)] text-[color:var(--color-brand-cream)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(90% 60% at 85% 10%, rgba(0, 201, 150, 0.22), transparent 60%), radial-gradient(80% 60% at 10% 100%, rgba(12, 90, 110, 0.6), transparent 60%), linear-gradient(180deg, #002530 0%, #001c26 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="eyebrow text-[color:var(--color-brand-cream)]/60">
            From the room
          </div>
          <h2 className="display-lg mt-4 max-w-3xl text-balance text-[color:var(--color-brand-cream)]">
            What members{" "}
            <em className="not-italic italic text-[color:var(--color-brand-accent-bright)]">
              actually
            </em>{" "}
            say.
          </h2>
        </ScrollReveal>
      </div>

      <div className="mt-14 relative">
        <Marquee speed={55}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name + t.quote.slice(0, 12)}
              className="w-[340px] md:w-[420px] shrink-0 rounded-[var(--radius-card)] border border-[color:var(--color-brand-accent)]/20 bg-white/5 backdrop-blur-sm p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
            >
              <div className="font-[family-name:var(--font-display)] text-4xl leading-none text-[color:var(--color-brand-accent-bright)]">
                &ldquo;
              </div>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-[color:var(--color-brand-cream)]/90 text-pretty">
                {t.quote}
              </p>
              <div className="mt-6 pt-5 border-t border-[color:var(--color-brand-cream)]/15 flex items-center justify-between">
                <div className="font-medium text-sm text-[color:var(--color-brand-cream)]">
                  {t.name}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-cream)]/55">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
