export type EventKind =
  | "tour"
  | "pitch-night"
  | "workshop"
  | "meeting"
  | "networking";

export type EventStatus = "upcoming" | "ended" | "live";

export interface EventItem {
  id: string;
  kind: EventKind;
  title: string;
  date: string;
  endsAt?: string;
  venue: string;
  signupHref?: string;
  status: EventStatus;
}

export const EVENTS: EventItem[] = [
  {
    id: "sv-spring-2026",
    kind: "pitch-night",
    title: "Sharks' Valley — Spring Showcase",
    date: "May 8, 2026 · 6:00 PM",
    venue: "HSS 165 · Santa Monica College",
    signupHref: "/register/sharks-valley",
    status: "upcoming",
  },
  {
    id: "workshop-validation",
    kind: "workshop",
    title: "Idea → Validation in 45 Minutes",
    date: "April 30, 2026 · 11:15 AM",
    venue: "HSS 161 · Santa Monica College",
    signupHref: "https://discord.gg/cMkdZQGCSE",
    status: "upcoming",
  },
  {
    id: "networking-founders-night",
    kind: "networking",
    title: "Founders & Operators Night",
    date: "April 24, 2026 · 7:00 PM",
    venue: "Cayton Center · Santa Monica",
    signupHref: "https://discord.gg/cMkdZQGCSE",
    status: "upcoming",
  },
  {
    id: "sv-winter-2026",
    kind: "pitch-night",
    title: "Sharks' Valley — Winter Edition",
    date: "February 13, 2026 · 6:00 PM",
    venue: "HSS 165 · Santa Monica College",
    status: "ended",
  },
  {
    id: "weekly-meeting",
    kind: "meeting",
    title: "Weekly Meeting · Frameworks & AMA",
    date: "Tuesdays · 11:00 AM",
    venue: "1900 Pico Blvd · Santa Monica",
    signupHref: "https://discord.gg/cMkdZQGCSE",
    status: "upcoming",
  },
];
