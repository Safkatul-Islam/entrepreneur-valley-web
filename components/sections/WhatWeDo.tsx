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
    desc: "Smaller practice stages leading up to Sharks' Valley. Bring a deck or an idea on a napkin.",
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
    <section id="what-we-do" className="relative py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #e3ecee 0%, #eef3f4 45%, #dfe9ec 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 201, 150, 0.35), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-32 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 61, 77, 0.45), transparent 60%)",
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

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a, i) => (
            <ScrollReveal key={a.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full rounded-[var(--radius-card)] border border-[color:var(--color-brand-primary)]/15 bg-white/70 backdrop-blur-sm p-7 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--color-brand-accent) 18%, transparent), transparent 65%)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[color:var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="rounded-full border border-[color:var(--color-line)] px-3 py-1 text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[color:var(--color-muted)]">
                    {a.cadence}
                  </div>
                </div>
                <div className="relative mt-16">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-none">
                    {a.label}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
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
