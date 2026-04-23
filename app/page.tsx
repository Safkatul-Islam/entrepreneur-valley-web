import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Testimonials />
      <JoinCTA />
    </main>
  );
}
