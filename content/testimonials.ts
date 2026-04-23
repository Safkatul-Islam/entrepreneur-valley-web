export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// TODO: swap for real member quotes before launch.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I came in with zero plan and left with a co-founder and a real product. The pace of this club is unlike any other org on campus.",
    name: "Ana L.",
    role: "Junior · CS",
  },
  {
    quote:
      "Sharks' Valley was the single most formative night of my college experience. I pitched, I failed, I rebuilt, I shipped.",
    name: "Marcus T.",
    role: "Senior · Business",
  },
  {
    quote:
      "The board actually shows up for you. It's not a résumé line — these are the people I text when something's on fire at 2am.",
    name: "Priya R.",
    role: "Sophomore · Design",
  },
  {
    quote:
      "Went from 'someday maybe' to 'incorporated in Delaware' in one semester. The gap is smaller than you think.",
    name: "Jordan S.",
    role: "Junior · Econ",
  },
  {
    quote:
      "Every week I leave with a new idea I want to chase. Dangerous in the best way.",
    name: "Leah K.",
    role: "Freshman · Engineering",
  },
  {
    quote:
      "The feedback is brutal and that's exactly why you grow. No one here is here to be polite.",
    name: "Sam O.",
    role: "Senior · CS",
  },
];
