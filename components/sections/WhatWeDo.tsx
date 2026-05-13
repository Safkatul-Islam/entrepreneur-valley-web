"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

const ACTIVITIES = [
  {
    label: "Weekly Meetings",
    desc: "Every week at 1900 Pico Blvd. Frameworks, founder AMAs, and whatever the week demands.",
    cadence: "Weekly",
  },
  {
    label: "Workshops",
    desc: "Hands-on sessions on validation, fundraising, landing pages, cold outreach, and AI build tools.",
    cadence: "Monthly",
  },
  {
    label: "Pitch Nights",
    desc: "Smaller practice stages leading up to Sharks\u2019 Valley. Bring a deck or an idea on a napkin.",
    cadence: "Bi-monthly",
  },
  {
    label: "Networking Nights",
    desc: "Alumni founders, local operators, and investors in one room. Casual, high-signal, no pitching required.",
    cadence: "Semester",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper-dim) 0%, var(--color-paper) 50%, var(--color-paper-dim) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-accent) 35%, transparent), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-primary) 40%, transparent), transparent 60%)",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="eyebrow">What we do</div>
          <h2 className="display-lg mt-4 max-w-2xl text-balance">
            Four rooms,
            <br />
            one feedback loop.
          </h2>
        </ScrollReveal>

        <div className="mt-12 md:mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a, i) => (
            <ScrollReveal key={a.label} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-white/80 backdrop-blur-sm p-6 md:p-7 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--color-brand-accent) 14%, transparent), transparent 60%)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[color:var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="rounded-full border border-[color:var(--color-line)] px-2.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[color:var(--color-muted)]">
                    {a.cadence}
                  </div>
                </div>
                <div className="relative mt-12 md:mt-14">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-[1.05]">
                    {a.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {a.desc}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
