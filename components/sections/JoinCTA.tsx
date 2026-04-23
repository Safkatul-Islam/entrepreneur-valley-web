"use client";

import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const DISCORD = "https://discord.gg/cMkdZQGCSE";

export function JoinCTA() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #b8e8d4 0%, #9ddcbf 55%, #b0e4cd 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-55 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 201, 150, 0.6), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 61, 77, 0.55), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-32 -bottom-32 opacity-[0.08] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={520}
          height={520}
          className="w-[520px] h-auto"
        />
      </div>

      <div className="container-page relative">
        <ScrollReveal>
          <div className="eyebrow text-[color:var(--color-brand-primary-dark)]/70">
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

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <ScrollReveal delay={0.1}>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
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
                    <span className="text-[color:var(--color-brand-primary-dark)]/70">
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
                    <span className="text-[color:var(--color-brand-primary-dark)]/70">
                      Register now ↘︎
                    </span>
                  </>
                }
              />
            </dl>

            <div className="mt-12 flex flex-wrap gap-3">
              <MagneticButton href="/register/sharks-valley" variant="primary">
                Register for Sharks&rsquo; Valley →
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

          <ScrollReveal delay={0.2} className="flex md:justify-end">
            <div className="inline-block rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] border border-[color:var(--color-line)]">
              <QRCodeSVG
                value={DISCORD}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                className="block"
              />
              <div className="mt-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-primary-dark)]/70 text-center">
                Scan → discord.gg/ev
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
      <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[color:var(--color-brand-primary-dark)]/65">
        {label}
      </dt>
      <dd className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight text-[color:var(--color-brand-primary-dark)]">
        {value}
      </dd>
    </div>
  );
}
