import type { Metadata } from "next";
import { Mission } from "@/components/sections/Mission";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Entrepreneur's Valley exists for students who don't want to wait until graduation to start building. Build, critique, back each other.",
};

export default function MissionPage() {
  return (
    <main id="top" className="min-h-dvh pt-24 md:pt-32">
      <Mission />
    </main>
  );
}
