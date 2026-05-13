"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SHARKS_VALLEY } from "@/content/sharks-valley";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SharksValley() {
  return (
    <section
      id="sharks-valley"
      className="relative py-24 md:py-36 bg-[var(--color-brand-sharks-dark)] text-[color:var(--color-brand-chrome)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 75% 10%, color-mix(in oklab, var(--color-brand-sharks-light) 35%, transparent), transparent 50%), radial-gradient(90% 70% at 20% 95%, color-mix(in oklab, var(--color-brand-sharks) 70%, black), transparent 55%), linear-gradient(175deg, var(--color-brand-sharks-dark), #071e24 50%, var(--color-brand-sharks))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <h2 className="display-condensed chrome-text text-center">
            Sharks&rsquo; Valley
            <br />
            Event Details
          </h2>
        </ScrollReveal>

        <StatsRow />

        <div className="mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <ScrollReveal delay={0.08}>
            <div className="eyebrow text-[color:var(--color-brand-chrome)]/50">
              {SHARKS_VALLEY.tagline}
            </div>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-[color:var(--color-brand-chrome)]/70 text-pretty">
              {SHARKS_VALLEY.recap}
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-[color:var(--color-brand-chrome)]/50 text-pretty">
              {SHARKS_VALLEY.longCopy}
            </p>
            <div className="mt-8">
              <MagneticButton
                href="/register/sharks-valley"
                variant="accent"
                className="bg-transparent border-2 border-[var(--color-brand-accent)] text-[color:var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)] hover:text-[color:var(--color-brand-sharks-dark)] uppercase font-[family-name:var(--font-mono)] tracking-wider text-sm"
              >
                Register Now &rarr;
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative aspect-square mx-auto max-w-xs md:max-w-sm">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-[50px] opacity-25"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-brand-sharks-light), transparent 55%)",
                }}
              />
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/sharks-valley/logo.png"
                  alt="Sharks' Valley logo"
                  fill
                  sizes="(max-width: 768px) 70vw, 35vw"
                  className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
                />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div
      ref={ref}
      className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4"
    >
      {SHARKS_VALLEY.stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.06 + i * 0.05,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm px-5 py-3"
        >
          <span className="font-[family-name:var(--font-condensed)] text-2xl md:text-3xl leading-none chrome-text">
            {s.value}
          </span>
          <span className="text-[10px] md:text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-[color:var(--color-brand-chrome)]/50">
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
