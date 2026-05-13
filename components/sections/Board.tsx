"use client";

import Image from "next/image";
import { BOARD } from "@/content/board";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Linkedin } from "lucide-react";

export function Board() {
  return (
    <section id="board" className="relative py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper-dim) 0%, var(--color-paper) 50%, var(--color-paper-dim) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklab, var(--color-brand-accent) 25%, transparent), transparent 60%)",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">The People</div>
              <h2 className="display-lg mt-4 text-balance text-[color:var(--color-brand-primary-dark)]">
                Meet the board.
              </h2>
            </div>
            <p className="max-w-sm text-sm md:text-base text-[color:var(--color-ink-soft)] leading-relaxed">
              Twelve operators keeping the club running. Different majors,
              same bias &mdash; toward shipping.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 md:mt-16 grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {BOARD.map((m, i) => (
            <ScrollReveal key={m.role} delay={(i % 4) * 0.06}>
              <TiltCard className="h-full rounded-[var(--radius-card)]">
                <div className="group relative h-full rounded-[var(--radius-card)] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] overflow-hidden shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={m.photo}
                      alt={`${m.name} \u2014 ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0, 37, 48, 0.9), rgba(0, 37, 48, 0.2) 40%, transparent 60%)",
                      }}
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <p className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 text-xs leading-snug text-[color:var(--color-brand-cream)] text-pretty">
                        {m.bio}
                      </p>
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="shrink-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 inline-flex items-center justify-center size-8 rounded-full bg-[color:var(--color-brand-accent)] text-[color:var(--color-brand-primary-dark)] hover:bg-[color:var(--color-brand-accent-bright)]"
                        >
                          <Linkedin className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-4 border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)]">
                    <div className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight text-[color:var(--color-brand-primary-dark)]">
                      {m.name === "\u2014" ? (
                        <span className="italic text-[color:var(--color-muted)]">
                          Name coming soon
                        </span>
                      ) : (
                        m.name
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
