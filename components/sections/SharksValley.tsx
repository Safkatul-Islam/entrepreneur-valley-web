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
      className="relative py-28 md:py-40 bg-[var(--color-brand-sharks-dark)] text-[color:var(--color-brand-chrome)] overflow-hidden"
    >
      {/* Atmospheric background — deep teal gradient + subtle chrome glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 10%, color-mix(in oklab, var(--color-brand-sharks-light) 40%, transparent), transparent 55%), radial-gradient(100% 80% at 20% 100%, color-mix(in oklab, var(--color-brand-sharks) 80%, black), transparent 60%), linear-gradient(180deg, var(--color-brand-sharks-dark), var(--color-brand-sharks))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-page relative">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <ScrollReveal>
            <div className="eyebrow text-[color:var(--color-brand-chrome)]/70">
              {SHARKS_VALLEY.tagline}
            </div>
            <h2 className="display-condensed mt-6 chrome-text">
              Sharks&rsquo;
              <br />
              Valley.
            </h2>
            <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-[color:var(--color-brand-chrome)]/75 text-pretty">
              {SHARKS_VALLEY.recap}
            </p>
            <div className="mt-8">
              <MagneticButton
                href="/register/sharks-valley"
                variant="accent"
                className="bg-[color:var(--color-brand-chrome)] text-[color:var(--color-brand-sharks-dark)] hover:bg-[color:var(--color-brand-chrome-bright)]"
              >
                Register for the next one →
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative aspect-square md:aspect-[4/5] mx-auto max-w-md md:max-w-none">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-[80px] opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-brand-sharks-light), transparent 60%)",
                }}
              />
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/sharks-valley/logo.png"
                  alt="Sharks' Valley logo"
                  fill
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        <StatsRow />

        <ScrollReveal delay={0.1}>
          <p className="mt-20 max-w-3xl text-base md:text-lg leading-relaxed text-[color:var(--color-brand-chrome)]/70">
            {SHARKS_VALLEY.longCopy}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <div
      ref={ref}
      className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-brand-chrome)]/10 rounded-[var(--radius-card)] overflow-hidden backdrop-blur-sm"
    >
      {SHARKS_VALLEY.stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.1 + i * 0.08,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="bg-[color:var(--color-brand-sharks-dark)]/60 p-8 md:p-10"
        >
          <div className="font-[family-name:var(--font-condensed)] text-5xl md:text-6xl leading-none chrome-text">
            {s.value}
          </div>
          <div className="mt-3 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-[color:var(--color-brand-chrome)]/60">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
