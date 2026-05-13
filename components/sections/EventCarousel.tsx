"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Mic2,
  Wrench,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { EVENTS, type EventItem, type EventKind } from "@/content/events";

const AUTO_ADVANCE_MS = 6000;

const KIND_META: Record<EventKind, { label: string; icon: typeof MapPin }> = {
  tour: { label: "Tour", icon: MapPin },
  "pitch-night": { label: "Pitch Night", icon: Mic2 },
  workshop: { label: "Workshop", icon: Wrench },
  meeting: { label: "Weekly Meeting", icon: Calendar },
  networking: { label: "Networking", icon: Users },
};

function StatusBadge({ status }: { status: EventItem["status"] }) {
  const tone =
    status === "upcoming"
      ? "bg-[color:var(--color-brand-accent)]/15 text-[color:var(--color-brand-accent-deep)] border-[color:var(--color-brand-accent)]/40"
      : status === "live"
      ? "bg-[color:var(--color-brand-accent-bright)]/20 text-[color:var(--color-brand-primary-dark)] border-[color:var(--color-brand-accent)]/50"
      : "bg-[color:var(--color-brand-primary-dark)]/5 text-[color:var(--color-muted)] border-[color:var(--color-line)]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest ${tone}`}
    >
      {status}
    </span>
  );
}

export function EventCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const event = EVENTS[index];
  const total = EVENTS.length;

  useEffect(() => {
    if (reduced || paused || total < 2) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, total]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i - 1 + total) % total);
      }
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [total]);

  const kindMeta = KIND_META[event.kind];
  const KindIcon = kindMeta.icon;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Upcoming events"
      className="relative w-full max-w-lg outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-accent)]/50 rounded-[var(--radius-card)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-white/80 backdrop-blur-md shadow-[var(--shadow-card)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-brand-accent)]/30 bg-[color:var(--color-brand-accent)]/8 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-primary-dark)]">
                <KindIcon className="size-3" aria-hidden />
                {kindMeta.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
                  {event.date}
                </span>
                <StatusBadge status={event.status} />
              </div>
            </div>

            <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl md:text-[1.75rem] leading-tight text-[color:var(--color-brand-primary-dark)] text-balance">
              {event.title}
            </h3>

            <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-[color:var(--color-muted)]">
              {event.venue}
            </p>

            {event.signupHref && event.status !== "ended" ? (
              <Link
                href={event.signupHref}
                target={event.signupHref.startsWith("http") ? "_blank" : undefined}
                rel={event.signupHref.startsWith("http") ? "noreferrer" : undefined}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-brand-accent-deep)] hover:text-[color:var(--color-brand-primary)] transition-colors"
              >
                Sign up
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {!reduced && total > 1 ? (
          <motion.div
            key={`progress-${event.id}`}
            initial={{ width: "0%" }}
            animate={{ width: paused ? "0%" : "100%" }}
            transition={{
              duration: paused ? 0 : AUTO_ADVANCE_MS / 1000,
              ease: "linear",
            }}
            className="h-[2px] bg-[color:var(--color-brand-accent)]"
          />
        ) : null}
      </div>

      {total > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {EVENTS.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to event ${i + 1}: ${e.title}`}
              aria-current={i === index}
              className={`size-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-[color:var(--color-brand-accent-deep)]"
                  : "bg-[color:var(--color-brand-primary-dark)]/25 hover:bg-[color:var(--color-brand-primary-dark)]/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
