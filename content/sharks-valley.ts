export const SHARKS_VALLEY = {
  tagline: "Our Flagship Event",
  title: "Sharks' Valley",
  recap:
    "A night when student founders pitch real ideas to a room of judges, mentors, and peers. Some walk out with prize money. All walk out sharper than they walked in.",
  longCopy:
    "Sharks' Valley is the biggest night on our calendar. Weeks of prep, a live panel of judges drawn from our alumni investors and operator network, and a crowd pulling for every founder on stage. It's not a class project — it's a taste of what the next chapter actually feels like.",
  stats: [
    { value: "120+", label: "Attendees" },
    { value: "16", label: "Startup pitches" },
    { value: "8", label: "Judges" },
    { value: "$5K", label: "Prize pool" },
  ],
  // TODO: replace placeholder paths with real /sharks-valley/*.jpg photos before launch.
  gallery: [
    { src: "/sharks-valley/hero.jpg", alt: "Group photo from last Sharks' Valley", span: "lg" as const },
    { src: "/sharks-valley/shot-1.jpg", alt: "Founder pitching on stage" },
    { src: "/sharks-valley/shot-2.jpg", alt: "Judges panel" },
    { src: "/sharks-valley/shot-3.jpg", alt: "Crowd reaction moment" },
    { src: "/sharks-valley/shot-4.jpg", alt: "Award ceremony" },
    { src: "/sharks-valley/shot-5.jpg", alt: "Networking after the pitches" },
  ],
};

export type SharksGalleryItem = (typeof SHARKS_VALLEY.gallery)[number];
