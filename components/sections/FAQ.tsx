"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FAQ_ITEMS } from "@/content/faq";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Plus } from "lucide-react";

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper-dim) 55%, var(--color-paper) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-28 w-[42rem] h-[38rem] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-primary) 40%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-28 -left-20 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-accent) 25%, transparent), transparent 65%)",
        }}
      />

      <div className="container-page relative grid gap-12 md:gap-16 md:grid-cols-[1fr_1.4fr]">
        <ScrollReveal className="md:sticky md:top-28 md:self-start">
          <div className="eyebrow">Questions</div>
          <h2 className="display-lg mt-4 text-balance">
            Answered
            <br />
            honestly.
          </h2>
          <p className="mt-5 max-w-sm text-sm md:text-base text-[color:var(--color-ink-soft)] leading-relaxed">
            Still curious? Drop by a weekly meeting, or ask in the Discord
            &mdash; someone&rsquo;s always around.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <Accordion.Root
            type="single"
            collapsible
            className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]"
          >
            {FAQ_ITEMS.map((item, i) => (
              <Accordion.Item
                key={item.q}
                value={`item-${i}`}
                className="group"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left hover:text-[var(--color-brand-primary)] transition-colors">
                    <span className="font-[family-name:var(--font-display)] text-lg md:text-xl leading-tight pr-3">
                      {item.q}
                    </span>
                    <Plus
                      aria-hidden
                      className="shrink-0 size-4.5 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pb-6 pr-8 text-[color:var(--color-ink-soft)] leading-relaxed text-pretty text-sm md:text-base">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </ScrollReveal>
      </div>
    </section>
  );
}
