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
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-watermark", {
        yPercent: -15,
        rotate: -4,
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
      className="relative min-h-[100svh] isolate flex items-end pt-24 pb-12 md:pb-20 overflow-hidden grain"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hero-parallax"
        style={{
          background:
            "radial-gradient(120% 70% at 85% 15%, color-mix(in oklab, var(--color-brand-accent) 22%, transparent), transparent 50%), radial-gradient(100% 60% at 10% 95%, color-mix(in oklab, var(--color-brand-primary) 18%, transparent), transparent 55%), linear-gradient(175deg, var(--color-paper) 0%, var(--color-paper-dim) 100%)",
        }}
      />

      <div
        aria-hidden
        className="hero-watermark absolute -right-16 md:-right-8 top-[12%] -z-10 opacity-[0.05] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={600}
          height={600}
          priority
          className="w-[min(70vw,560px)] h-auto"
        />
      </div>

      <div className="container-page w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          Entrepreneur&rsquo;s Valley &middot; SMC &middot; est. 2024
        </motion.div>

        <h1 className="title-home-jakarta mt-5 text-balance text-[color:var(--color-brand-primary-dark)]">
          {HEADLINE.map((word, i) => (
            <span
              key={word + i}
              className="inline-block overflow-hidden align-bottom mr-[0.2em]"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.08 + i * 0.06,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {i === HEADLINE.length - 1 ? (
                  <em className="not-italic text-[color:var(--color-brand-accent-deep)]">
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-base md:text-lg text-[color:var(--color-ink-soft)] leading-relaxed text-pretty"
        >
          A student-led home at Santa Monica College for builders, founders,
          and the relentlessly curious. Weekly meetings, hard feedback, and a
          flagship pitch night that&rsquo;s earned a name &mdash;{" "}
          <em className="font-[family-name:var(--font-display)] italic text-[color:var(--color-brand-sharks)]">
            Sharks&rsquo; Valley
          </em>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            href="https://discord.gg/cMkdZQGCSE"
            variant="primary"
            target="_blank"
          >
            Join the Discord
            <span aria-hidden>&rarr;</span>
          </MagneticButton>
          <MagneticButton href="/sharks-valley" variant="outline">
            See Sharks&rsquo; Valley
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16"
        >
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] mb-3">
            What&rsquo;s next
          </div>
          <EventCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-[color:var(--color-ink-soft)]"
        >
          <Clock className="size-3.5 text-[color:var(--color-brand-accent-deep)]" aria-hidden />
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest">
            Tuesdays &middot; 11:00 AM &ndash; 12:00 PM
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-12 md:mt-16 flex items-center gap-3 text-xs text-[color:var(--color-muted)]"
        >
          <span className="h-px w-8 bg-[color:var(--color-muted)] opacity-40" />
          <span className="font-[family-name:var(--font-mono)] tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
