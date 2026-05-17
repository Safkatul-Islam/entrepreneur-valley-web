"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { RoleSelector } from "./RoleSelector";
import { PitcherForm } from "./PitcherForm";

const DISCORD =
  process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/cMkdZQGCSE";

type Step = "select" | "form" | "success";

export function RegisterForm() {
  const [step, setStep] = useState<Step>("select");

  return (
    <AnimatePresence mode="wait">
      {step === "select" && (
        <motion.div
          key="select"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <RoleSelector onPitch={() => setStep("form")} />
        </motion.div>
      )}

      {step === "form" && (
        <motion.div
          key="form-pitcher"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => setStep("select")}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[color:var(--color-brand-cream)]/50 hover:text-[color:var(--color-brand-cream)] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Change selection
          </button>
          <PitcherForm onSuccess={() => setStep("success")} />
        </motion.div>
      )}

      {step === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, var(--color-cta-bg) 0%, #e0f5ec 40%, var(--color-paper) 100%)",
          }}
        >
          <div className="px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-[color:var(--color-brand-primary-dark)]"
            >
              You&rsquo;re in.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base md:text-lg text-[color:var(--color-ink-soft)] max-w-md mx-auto leading-relaxed"
            >
              Welcome to the community. Get ready to build.
              <br />
              <span className="text-[color:var(--color-muted)]">
                You should receive a confirmation email soon.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href={DISCORD}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-accent)] text-[color:var(--color-brand-primary-dark)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-brand-accent-bright)] transition-colors"
              >
                Join Discord &rarr;
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-primary-dark)] text-[color:var(--color-brand-primary-dark)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-brand-primary-dark)] hover:text-white transition-colors"
              >
                Back to Site
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
