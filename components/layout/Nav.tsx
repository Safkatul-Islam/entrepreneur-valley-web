"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/mission", label: "Our Mission" },
  { href: "/sharks-valley", label: "Last Sharks' Valley" },
  { href: "/board", label: "Club Members" },
  { href: "/faq", label: "Questions" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const bg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(245,247,248,0)", "rgba(245,247,248,0.88)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[backdrop-filter,border] duration-300",
        (scrolled || menuOpen) &&
          "backdrop-blur-lg border-b border-[color:var(--color-line)]"
      )}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink font-medium tracking-tight"
          aria-label="Entrepreneur's Valley — home"
        >
          <Image
            src="/logo-ev.png"
            alt=""
            width={44}
            height={44}
            priority
            className="size-9 md:size-10 object-contain"
          />
          <span className="hidden sm:inline font-[family-name:var(--font-display)] text-xl md:text-[1.35rem] text-[color:var(--color-brand-primary-dark)]">
            Entrepreneur&rsquo;s Valley
          </span>
        </Link>

        <nav className="max-md:hidden flex items-center gap-6 lg:gap-8">
          {LINKS.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "group relative text-sm whitespace-nowrap transition-colors",
                  active
                    ? "text-[color:var(--color-brand-primary)]"
                    : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-brand-primary)]"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-[color:var(--color-brand-accent-deep)] transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/register/sharks-valley"
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-primary)] text-[color:var(--color-brand-cream)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-brand-primary-dark)] transition-colors"
          >
            Register
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="max-md:inline-flex hidden items-center justify-center size-10 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-brand-primary-dark)] hover:bg-[color:var(--color-paper-dim)] transition-colors"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-md:block hidden overflow-hidden border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)]/95 backdrop-blur-lg"
          >
            <ul className="container-page py-4 flex flex-col gap-1">
              {LINKS.map((l) => {
                const active =
                  pathname === l.href ||
                  (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-base transition-colors",
                        active
                          ? "bg-[color:var(--color-brand-accent)]/15 text-[color:var(--color-brand-primary)]"
                          : "text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
