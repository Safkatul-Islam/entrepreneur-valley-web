import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Testimonials } from "@/components/sections/Testimonials";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <WhatWeDo />
      <Testimonials />
      <JoinCTA />
    </main>
  );
}
