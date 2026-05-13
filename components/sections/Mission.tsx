"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Mission() {
  return (
    <section
      id="mission"
      className="relative py-24 md:py-36 text-[#f2e8a3] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 82% 18%, rgba(26, 163, 92, 0.3), transparent 55%), radial-gradient(90% 70% at 15% 95%, rgba(6, 58, 30, 0.65), transparent 55%), linear-gradient(180deg, #0a5f32 0%, #074526 100%)",
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
      <div
        aria-hidden
        className="absolute -bottom-28 -left-16 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-15"
        style={{
          background: "radial-gradient(circle, #f2e8a3, transparent 55%)",
        }}
      />

      <div className="container-page relative grid gap-12 md:gap-20 md:grid-cols-[1fr_1.1fr] items-start">
        <ScrollReveal className="md:sticky md:top-28">
          <div className="eyebrow text-[#f2e8a3]/70">Our Mission</div>
          <h2 className="display-lg mt-5 text-balance text-[#f2e8a3]">
            We don&rsquo;t teach entrepreneurship.
            <br />
            <em className="not-italic italic text-[#e9dd8a]">
              We practice it.
            </em>
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={0.08}>
            <p className="text-base md:text-lg leading-relaxed text-[#f2e8a3]/80 text-pretty">
              Entrepreneur&rsquo;s Valley exists for the students who
              don&rsquo;t want to wait until graduation to start building.
              We&rsquo;re a room full of people who&rsquo;d rather ship a bad
              v1 this week than polish a deck forever.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base md:text-lg leading-relaxed text-[#f2e8a3]/80 text-pretty">
              What you&rsquo;ll find here: honest feedback, fast iteration,
              and a network of peers who&rsquo;ll be in your corner long
              after the semester ends. What you won&rsquo;t find: r&eacute;sum&eacute;
              padding, jargon, or people who came to watch.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.22}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-[#f2e8a3]/15 pt-8">
              {[
                { k: "Build", v: "Ship weekly, not someday." },
                { k: "Critique", v: "Honest > polite." },
                { k: "Back each other", v: "The network is the product." },
              ].map((p) => (
                <div key={p.k}>
                  <div className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[#f2e8a3]">
                    {p.k}.
                  </div>
                  <div className="mt-1.5 text-sm text-[#f2e8a3]/65">
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
