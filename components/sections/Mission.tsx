"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Mission() {
  return (
    <section
      id="mission"
      className="relative py-28 md:py-40 text-[#f2e8a3] overflow-hidden"
    >
      {/* Heritage emerald — restored per club direction */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 85% 15%, rgba(26, 163, 92, 0.35), transparent 60%), radial-gradient(100% 80% at 15% 100%, rgba(6, 58, 30, 0.7), transparent 60%), linear-gradient(180deg, #0a5f32 0%, #074526 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, #f2e8a3, transparent 60%)",
        }}
      />

      <div className="container-page relative grid gap-16 md:gap-24 md:grid-cols-[1fr_1.1fr] items-start">
        <ScrollReveal className="md:sticky md:top-28">
          <div className="eyebrow text-[#f2e8a3]/80">
            Our Mission
          </div>
          <h2 className="display-lg mt-6 text-balance text-[#f2e8a3]">
            We don&rsquo;t teach entrepreneurship.
            <br />
            <em className="not-italic italic text-[#e9dd8a]">
              We practice it.
            </em>
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed text-[#f2e8a3]/85 text-pretty">
              Entrepreneur&rsquo;s Valley exists for the students who
              don&rsquo;t want to wait until graduation to start building.
              We&rsquo;re a room full of people who&rsquo;d rather ship a bad
              v1 this week than polish a deck forever.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed text-[#f2e8a3]/85 text-pretty">
              What you&rsquo;ll find here: honest feedback, fast iteration,
              and a network of peers who&rsquo;ll be in your corner long
              after the semester ends. What you won&rsquo;t find: résumé
              padding, jargon, or people who came to watch.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#f2e8a3]/20 pt-10">
              {[
                { k: "Build", v: "Ship weekly, not someday." },
                { k: "Critique", v: "Honest > polite." },
                { k: "Back each other", v: "The network is the product." },
              ].map((p) => (
                <div key={p.k}>
                  <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[#f2e8a3]">
                    {p.k}.
                  </div>
                  <div className="mt-2 text-sm text-[#f2e8a3]/75">
                    {p.v}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
