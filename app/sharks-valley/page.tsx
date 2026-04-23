import type { Metadata } from "next";
import { SharksValley } from "@/components/sections/SharksValley";

export const metadata: Metadata = {
  title: "Last Sharks' Valley",
  description:
    "Our flagship pitch night. A recap of the last Sharks' Valley — stats, highlights, and how to sign up for the next one.",
};

export default function SharksValleyPage() {
  return (
    <main id="top" className="min-h-dvh pt-24 md:pt-32">
      <SharksValley />
    </main>
  );
}
