"use client";

import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const DISCORD =
  process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/cMkdZQGCSE";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://entrepreneursvalley.club";
const REGISTER_URL =
  process.env.NEXT_PUBLIC_REGISTER_URL ?? `${SITE_URL}/register/sharks-valley`;

export function JoinCTA() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-cta-bg) 0%, var(--color-cta-bg-mid) 55%, var(--color-cta-bg-end) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-accent) 50%, transparent), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-primary) 45%, transparent), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-28 -bottom-28 opacity-[0.06] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={480}
          height={480}
          className="w-[480px] h-auto"
        />
      </div>

      <div className="container-page relative">
        <ScrollReveal>
          <div className="eyebrow text-[color:var(--color-brand-primary-dark)]/60">
            Join us
          </div>
          <h2 className="display-xl mt-4 text-balance text-[color:var(--color-brand-primary-dark)]">
            Show up.
            <br />
            <em className="not-italic italic text-[color:var(--color-brand-primary)]">
              Start building.
            </em>
          </h2>
        </ScrollReveal>

        <div className="mt-12 md:mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <ScrollReveal delay={0.08}>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              <InfoBlock
                label="Where"
                value={
                  <>
                    Santa Monica College
                    <br />
                    1900 Pico Blvd
                  </>
                }
              />
              <InfoBlock
                label="When"
                value={
                  <>
                    Weekly meetings
                    <br />
                    <span className="text-[color:var(--color-brand-primary-dark)]/60">
                      Day &amp; time pinned in Discord
                    </span>
                  </>
                }
              />
              <InfoBlock
                label="How"
                value={
                  <>
                    Scan the QR, or
                    <br />
                    click through below
                  </>
                }
              />
              <InfoBlock
                label="Flagship"
                value={
                  <>
                    Sharks&rsquo; Valley
                    <br />
                    <span className="text-[color:var(--color-brand-primary-dark)]/60">
                      Register now &darr;
                    </span>
                  </>
                }
              />
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="/register/sharks-valley" variant="primary">
                Register for Sharks&rsquo; Valley &rarr;
              </MagneticButton>
              <MagneticButton
                href={DISCORD}
                variant="outline"
                target="_blank"
              >
                Open Discord
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="flex md:justify-end">
            <div className="inline-block rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-card)] border border-[color:var(--color-line)]">
              <QRCodeSVG
                value={REGISTER_URL}
                size={200}
                bgColor="#ffffff"
                fgColor="#0a1a20"
                level="M"
                className="block"
              />
              <div className="mt-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-primary-dark)]/60 text-center">
                Scan to register
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-primary-dark)]/55">
        {label}
      </dt>
      <dd className="mt-1.5 font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-tight text-[color:var(--color-brand-primary-dark)]">
        {value}
      </dd>
    </div>
  );
}
