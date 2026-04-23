"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationInput } from "@/lib/schemas";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const DISCORD =
  process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/cMkdZQGCSE";

export function RegisterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      school: "",
      yearMajor: "",
      dietary: "",
      accessibility: "",
      motivation: "",
      consent: false,
    },
  });

  async function onSubmit(values: RegistrationInput) {
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !body.ok) {
        setStatus({
          kind: "error",
          message:
            body?.error ??
            "Couldn't submit your registration. Please try again.",
        });
        return;
      }
      setStatus({ kind: "success" });
      reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  if (status.kind === "success") {
    return <SuccessScreen />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            type="text"
            autoComplete="name"
            className={inputCls}
            {...register("fullName")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className={inputCls}
            {...register("email")}
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            className={inputCls}
            {...register("phone")}
          />
        </Field>
        <Field label="School" error={errors.school?.message}>
          <input type="text" className={inputCls} {...register("school")} />
        </Field>
        <Field
          label="Year & major"
          error={errors.yearMajor?.message}
          className="md:col-span-2"
        >
          <input
            type="text"
            placeholder="e.g. Junior, Computer Science"
            className={inputCls}
            {...register("yearMajor")}
          />
        </Field>
        <Field label="Dietary (optional)" error={errors.dietary?.message}>
          <input type="text" className={inputCls} {...register("dietary")} />
        </Field>
        <Field
          label="Accessibility (optional)"
          error={errors.accessibility?.message}
        >
          <input
            type="text"
            className={inputCls}
            {...register("accessibility")}
          />
        </Field>
        <Field
          label="Why do you want to attend? (optional)"
          error={errors.motivation?.message}
          className="md:col-span-2"
        >
          <textarea
            rows={4}
            maxLength={500}
            className={cn(inputCls, "resize-none")}
            {...register("motivation")}
          />
        </Field>
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-[var(--color-brand-primary)]"
          {...register("consent")}
        />
        <span className="text-[color:var(--color-ink-soft)] leading-relaxed">
          I agree to be contacted about Sharks&rsquo; Valley event details.
        </span>
      </label>
      {errors.consent?.message && (
        <p className="text-sm text-red-600">{errors.consent.message}</p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="group inline-flex items-center gap-2 rounded-full bg-ink text-[color:var(--color-paper)] px-7 py-3.5 text-sm md:text-base font-medium hover:bg-[var(--color-brand-primary)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status.kind === "submitting"
            ? "Submitting…"
            : "Complete registration"}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
        <AnimatePresence>
          {status.kind === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-600"
            >
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-[color:var(--color-line)] bg-white/70 px-4 py-3 text-ink text-base outline-none transition-[border,box-shadow] placeholder:text-[color:var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[color:var(--color-brand-primary)]/10";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="block mb-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-[color:var(--color-muted)]">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-red-600">{error}</span>
      )}
    </label>
  );
}

function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-paper-dim)] p-10 md:p-14"
    >
      <div className="eyebrow text-[var(--color-brand-primary)]">
        You&rsquo;re in
      </div>
      <h2 className="display-lg mt-4">
        See you at Sharks&rsquo;{" "}
        <em className="not-italic text-[var(--color-brand-sharks)]">
          Valley.
        </em>
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
        We&rsquo;ll send event details to your inbox. In the meantime — hop
        into the Discord and introduce yourself. The community is where
        half the value lives.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-[color:var(--color-paper)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-brand-primary)] transition-colors"
        >
          Open Discord →
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-[color:var(--color-paper)] transition-colors"
        >
          Back to site
        </a>
      </div>
    </motion.div>
  );
}
