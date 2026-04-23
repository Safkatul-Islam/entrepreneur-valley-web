import type { Metadata } from "next";
import { Board } from "@/components/sections/Board";

export const metadata: Metadata = {
  title: "Club Members",
  description:
    "Meet the board. Twelve operators keeping Entrepreneur's Valley running — different majors, same bias toward shipping.",
};

export default function BoardPage() {
  return (
    <main id="top" className="min-h-dvh pt-24 md:pt-32">
      <Board />
    </main>
  );
}
