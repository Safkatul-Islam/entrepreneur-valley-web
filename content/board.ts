export type BoardMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  leadership?: boolean;
};

/**
 * Board photos are pre-designed portrait cards with the role title baked into
 * the image on a cream paper texture with a green accent strip behind the
 * person. Because the role already reads in the image, we don't re-render it
 * as a text label — we show the member's NAME below the card only.
 */
export const BOARD: BoardMember[] = [
  {
    name: "Stanislas Shvets",
    role: "President & Founder",
    bio: "Founder of Entrepreneur's Valley. Believes the best founders start before they're ready.",
    photo: "/board/board-01.png",
    linkedin: "https://linkedin.com/in/",
    leadership: true,
  },
  {
    name: "Diego Molina",
    role: "Vice President",
    bio: "Operator's mindset. Keeps the club running and the board aligned.",
    photo: "/board/board-02.png",
    linkedin: "https://linkedin.com/in/",
    leadership: true,
  },
  {
    name: "Alec Eshraghi",
    role: "External Events Chair",
    bio: "Owns every moment outside our four walls — campus events, collabs, field trips.",
    photo: "/board/board-03.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Jocelyn Prado",
    role: "Secretary",
    bio: "Memory of the club. Meetings, minutes, and making sure nothing falls through.",
    photo: "/board/board-04.png",
    linkedin: "https://linkedin.com/in/",
    leadership: true,
  },
  {
    name: "Michael Kalu",
    role: "Social Media Manager",
    bio: "Runs the feed. The club's voice on Instagram, LinkedIn, and everywhere between.",
    photo: "/board/board-05.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Adam Cherkaoui Jaouad",
    role: "Treasurer",
    bio: "Budget, sponsorship dollars, event funding — the numbers behind every event.",
    photo: "/board/board-06.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Alex Kuok",
    role: "Ambassador",
    bio: "Bridges the club with the wider campus and startup community.",
    photo: "/board/board-07.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Safkat",
    role: "Startup Advisor",
    bio: "Builds the systems the club runs on. Advises founders on what's technically possible now.",
    photo: "/board/board-08.png",
    linkedin: "https://linkedin.com/in/",
    leadership: true,
  },
  {
    name: "Thin Yati Tun (Cindy)",
    role: "Director of Marketing",
    bio: "Brand, positioning, story. How the club shows up to the world.",
    photo: "/board/board-09.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Maybelle Llman",
    role: "External Partnerships Chair",
    bio: "Opens doors — to mentors, sponsors, investors, and opportunities.",
    photo: "/board/board-10.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Samantha Jauregui",
    role: "Social Chair",
    bio: "Holds the tone of the community — welcoming, ambitious, and real.",
    photo: "/board/board-11.png",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Semion Mallyer",
    role: "Head of External Events & Partnerships",
    bio: "Strategic partnerships and flagship event ops, from Sharks' Valley on down.",
    photo: "/board/board-12.png",
    linkedin: "https://linkedin.com/in/",
  },
];
