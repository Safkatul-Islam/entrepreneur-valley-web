"use client";

import { TESTIMONIALS } from "@/content/testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-[color:var(--color-brand-primary-dark)] text-[color:var(--color-brand-cream)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 50% at 80% 10%, color-mix(in oklab, var(--color-brand-accent) 18%, transparent), transparent 55%), radial-gradient(70% 50% at 15% 95%, color-mix(in oklab, var(--color-brand-primary-light) 50%, transparent), transparent 55%), linear-gradient(180deg, var(--color-brand-primary-dark) 0%, #001a22 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="eyebrow text-[color:var(--color-brand-cream)]/55">
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

      <div className="mt-12 relative">
        <Marquee speed={50}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name + t.quote.slice(0, 12)}
              className="w-[320px] md:w-[380px] shrink-0 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.6)]"
            >
              <div className="font-[family-name:var(--font-display)] text-3xl leading-none text-[color:var(--color-brand-accent-bright)]">
                &ldquo;
              </div>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-[color:var(--color-brand-cream)]/85 text-pretty">
                {t.quote}
              </p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="font-medium text-sm text-[color:var(--color-brand-cream)]">
                  {t.name}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-cream)]/50">
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
