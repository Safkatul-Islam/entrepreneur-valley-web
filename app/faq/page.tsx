import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Common questions about Entrepreneur's Valley — answered honestly.",
};

export default function FAQPage() {
  return (
    <main id="top" className="min-h-dvh pt-24 md:pt-32">
      <FAQ />
    </main>
  );
}
