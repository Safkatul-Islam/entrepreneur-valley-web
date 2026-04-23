"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FAQ_ITEMS } from "@/content/faq";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Plus } from "lucide-react";

export function FAQ() {
  return (
    <section id="faq" className="relative py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #e7eff1 0%, #dfe9ec 55%, #d4e0e3 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-32 w-[46rem] h-[42rem] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 61, 77, 0.5), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 201, 150, 0.3), transparent 65%)",
        }}
      />
      <div className="container-page relative grid gap-16 md:grid-cols-[1fr_1.4fr]">
        <ScrollReveal className="md:sticky md:top-28 md:self-start">
          <div className="eyebrow">Questions</div>
          <h2 className="display-lg mt-4 text-balance">
            Answered
            <br />
            honestly.
          </h2>
          <p className="mt-6 max-w-sm text-sm md:text-base text-[color:var(--color-ink-soft)] leading-relaxed">
            Still curious? Drop by a weekly meeting, or ask in the Discord —
            someone&rsquo;s always around.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
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
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left hover:text-[var(--color-brand-primary)] transition-colors">
                    <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight pr-4">
                      {item.q}
                    </span>
                    <Plus
                      aria-hidden
                      className="shrink-0 size-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pb-7 pr-10 text-[color:var(--color-ink-soft)] leading-relaxed text-pretty">
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
