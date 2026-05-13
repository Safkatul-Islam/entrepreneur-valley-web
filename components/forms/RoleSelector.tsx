"use client";

import { motion } from "framer-motion";
import { Users, Mic, ExternalLink } from "lucide-react";

const LUMA_URL =
  process.env.NEXT_PUBLIC_LUMA_EVENT_URL ?? "https://lu.ma/sharks-valley";

interface Props {
  onPitch: () => void;
}

export function RoleSelector({ onPitch }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Attendee -- redirects to LUMA */}
      <motion.a
        href={LUMA_URL}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex flex-col items-center gap-4 rounded-[var(--radius-card)] bg-white/90 backdrop-blur-lg p-8 md:p-10 text-center transition-shadow hover:shadow-[0_20px_50px_-15px_rgba(0,201,150,0.25)] overflow-hidden"
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-[color:var(--color-brand-primary)]/10 text-[color:var(--color-brand-primary)] transition-colors group-hover:bg-[color:var(--color-brand-accent)]/15 group-hover:text-[color:var(--color-brand-accent-deep)]">
          <Users className="size-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[color:var(--color-brand-primary-dark)]">
            Just Attending
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            I&rsquo;ll be there to listen, learn, and network.
          </p>
        </div>
        <span className="mt-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-accent)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-brand-primary-dark)] transition-colors hover:bg-[var(--color-brand-accent-bright)]">
          Continue as Attendee
          <ExternalLink className="size-3.5" />
        </span>
      </motion.a>

      {/* Pitcher -- opens our form */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPitch}
        className="group relative flex flex-col items-center gap-4 rounded-[var(--radius-card)] bg-white/90 backdrop-blur-lg p-8 md:p-10 text-center transition-shadow hover:shadow-[0_20px_50px_-15px_rgba(0,201,150,0.25)] overflow-hidden"
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-[color:var(--color-brand-primary)]/10 text-[color:var(--color-brand-primary)] transition-colors group-hover:bg-[color:var(--color-brand-accent)]/15 group-hover:text-[color:var(--color-brand-accent-deep)]">
          <Mic className="size-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[color:var(--color-brand-primary-dark)]">
            I&rsquo;ll Be Pitching
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            I&rsquo;m ready to present my idea and receive feedback.
          </p>
        </div>
        <span className="mt-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-accent)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-brand-primary-dark)] transition-colors hover:bg-[var(--color-brand-accent-bright)]">
          Continue as Pitcher
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </motion.button>
    </div>
  );
}
