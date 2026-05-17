import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Anton,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#002530" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Entrepreneur Valley — Where Future Founders Meet",
    template: "%s · Entrepreneur Valley",
  },
  description:
    "A student-led club for builders, founders, and the relentlessly curious. Join weekly meetings, pitch nights, and our flagship event — Sharks' Valley.",
  keywords: [
    "entrepreneur valley",
    "student startup club",
    "sharks valley",
    "campus entrepreneurship",
    "pitch competition",
    "SMC",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Entrepreneur Valley — Where Future Founders Meet",
    description:
      "Student entrepreneurs building the next generation of startups. Weekly meetings, workshops, pitch nights, and Sharks' Valley.",
    siteName: "Entrepreneur Valley",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrepreneur Valley",
    description: "Where future founders meet.",
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${anton.variable} ${plusJakartaSans.variable}`}
    >
      <body>
        <SmoothScroll>
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
