"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EventCarousel } from "@/components/sections/EventCarousel";
import { Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADLINE = ["Where", "future", "founders", "meet."];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-watermark", {
        yPercent: -20,
        rotate: -6,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] isolate flex items-end pt-28 pb-16 md:pb-24 overflow-hidden grain"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hero-parallax"
        style={{
          background:
            "radial-gradient(140% 80% at 88% 12%, color-mix(in oklab, var(--color-brand-accent) 28%, transparent), transparent 55%), radial-gradient(120% 70% at 8% 100%, color-mix(in oklab, var(--color-brand-primary) 22%, transparent), transparent 60%), linear-gradient(180deg, var(--color-paper), var(--color-paper-dim))",
        }}
      />

      <div
        aria-hidden
        className="hero-watermark absolute -right-20 md:-right-10 top-[10%] -z-10 opacity-[0.07] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={700}
          height={700}
          priority
          className="w-[min(80vw,640px)] h-auto"
        />
      </div>

      <div className="container-page w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          Entrepreneur&rsquo;s Valley · SMC · est. 2024
        </motion.div>

        <h1 className="display-xl mt-6 text-balance text-[color:var(--color-brand-primary-dark)]">
          {HEADLINE.map((word, i) => (
            <span
              key={word + i}
              className="inline-block overflow-hidden align-bottom mr-[0.22em]"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {i === HEADLINE.length - 1 ? (
                  <em className="not-italic font-[family-name:var(--font-display)] italic text-[color:var(--color-brand-accent-deep)]">
                    {word}
                  </em>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 max-w-xl text-base md:text-lg text-[color:var(--color-ink-soft)] leading-relaxed text-pretty"
        >
          A student-led home at Santa Monica College for builders, founders,
          and the relentlessly curious. Weekly meetings, hard feedback, and a
          flagship pitch night that&rsquo;s earned a name —{" "}
          <em className="font-[family-name:var(--font-display)] italic text-[color:var(--color-brand-sharks)]">
            Sharks&rsquo; Valley
          </em>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.85,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            href="https://discord.gg/cMkdZQGCSE"
            variant="primary"
            target="_blank"
          >
            Join the Discord
            <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href="/sharks-valley" variant="outline">
            See Sharks&rsquo; Valley
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 md:mt-20"
        >
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)] mb-4">
            What&rsquo;s next
          </div>
          <EventCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white/60 backdrop-blur-sm px-5 py-2.5 text-sm text-[color:var(--color-ink-soft)]"
        >
          <Clock className="size-3.5 text-[color:var(--color-brand-accent-deep)]" aria-hidden />
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest">
            Tuesdays · 11:00 AM – 12:00 PM
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-16 md:mt-20 flex items-center gap-3 text-xs text-[color:var(--color-muted)]"
        >
          <span className="h-px w-10 bg-[color:var(--color-muted)] opacity-40" />
          <span className="font-[family-name:var(--font-mono)] tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
