"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { pitcherSchema, type PitcherInput } from "@/lib/schemas";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FormField, darkInputCls } from "./FormField";
import { VideoUpload } from "./VideoUpload";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface Props {
  onSuccess: () => void;
}

export function PitcherForm({ onSuccess }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PitcherInput>({
    resolver: zodResolver(pitcherSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      school: "",
      major: "",
      videoUrl: "",
      consent: false,
    },
  });

  async function onSubmit(values: PitcherInput) {
    if (TURNSTILE_SITE_KEY != null && !turnstileToken) {
      setStatus({
        kind: "error",
        message: "Please complete the verification challenge.",
      });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken, website: "" }),
      });
      const body = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !body.ok) {
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        setStatus({
          kind: "error",
          message:
            body?.error ??
            "Couldn\u2019t submit your registration. Please try again.",
        });
        return;
      }
      setStatus({ kind: "success" });
      reset();
      onSuccess();
    } catch {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div aria-hidden className="hidden" style={{ display: "none" }}>
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="flex justify-center">
        <Image
          src="/sharks-valley/logo-wide.png"
          alt="Sharks' Valley"
          width={280}
          height={140}
          className="w-[200px] md:w-[260px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        />
      </div>

      <h2 className="text-center font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[color:var(--color-brand-cream)]">
        Pitcher Registration Form
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <FormField
            label="Full name"
            required
            error={errors.fullName?.message}
            dark
          >
            <input
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              className={darkInputCls}
              {...register("fullName")}
            />
          </FormField>
          <FormField label="Email" required error={errors.email?.message} dark>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              className={darkInputCls}
              {...register("email")}
            />
          </FormField>
          <FormField
            label="Phone"
            required
            error={errors.phone?.message}
            dark
          >
            <input
              type="tel"
              autoComplete="tel"
              placeholder="Phone"
              className={darkInputCls}
              {...register("phone")}
            />
          </FormField>
          <FormField label="School" required error={errors.school?.message} dark>
            <input
              type="text"
              placeholder="School"
              className={darkInputCls}
              {...register("school")}
            />
          </FormField>
          <FormField label="Major" required error={errors.major?.message} dark>
            <input
              type="text"
              placeholder="Major"
              className={darkInputCls}
              {...register("major")}
            />
          </FormField>
        </div>

        <div className="space-y-5">
          <FormField
            label="Pitch video"
            required
            error={errors.videoUrl?.message}
            dark
          >
            <Controller
              name="videoUrl"
              control={control}
              render={({ field }) => (
                <VideoUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.videoUrl?.message}
                />
              )}
            />
          </FormField>

          {TURNSTILE_SITE_KEY ? (
            <div className="pt-1">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "dark", size: "flexible" }}
              />
            </div>
          ) : null}

          <button
            type="submit"
            disabled={
              status.kind === "submitting" ||
              (TURNSTILE_SITE_KEY != null && !turnstileToken)
            }
            className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-accent)] text-[color:var(--color-brand-primary-dark)] px-7 py-3.5 text-sm md:text-base font-semibold hover:bg-[var(--color-brand-accent-bright)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.kind === "submitting"
              ? "Submitting\u2026"
              : "Submit Registration"}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </button>

          <AnimatePresence>
            {status.kind === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-400 text-center"
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-[var(--color-brand-accent)]"
          {...register("consent")}
        />
        <span className="text-[color:var(--color-brand-cream)]/50 leading-relaxed">
          I agree to be contacted about Sharks&rsquo; Valley event details. See
          our{" "}
          <a
            href="/privacy"
            className="underline text-[color:var(--color-brand-cream)]/70 hover:text-[var(--color-brand-accent)]"
          >
            privacy policy
          </a>{" "}
          for what we collect and how we use it.
        </span>
      </label>
      {errors.consent?.message && (
        <p className="text-sm text-red-400">{errors.consent.message}</p>
      )}
    </form>
  );
}
