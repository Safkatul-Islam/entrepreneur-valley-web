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
  { href: "/sharks-valley", label: "Sharks\u2019 Valley" },
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
    [0, 100],
    ["rgba(247,249,250,0)", "rgba(247,249,250,0.9)"],
  );

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[backdrop-filter,border] duration-200",
        (scrolled || menuOpen) &&
          "backdrop-blur-xl border-b border-[color:var(--color-line)]",
      )}
    >
      <div className="container-page flex items-center justify-between h-14 md:h-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink font-medium tracking-tight"
          aria-label="Entrepreneur\u2019s Valley \u2014 home"
        >
          <Image
            src="/logo-ev.png"
            alt=""
            width={36}
            height={36}
            priority
            className="size-8 md:size-9 object-contain"
          />
          <span className="hidden sm:inline font-[family-name:var(--font-display)] text-lg md:text-xl text-[color:var(--color-brand-primary-dark)]">
            Entrepreneur&rsquo;s Valley
          </span>
        </Link>

        <nav className="max-md:hidden flex items-center gap-5 lg:gap-7">
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
                    : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-brand-primary)]",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-[color:var(--color-brand-accent-deep)] transition-all duration-250",
                    active ? "w-full" : "w-0 group-hover:w-full",
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
              &rarr;
            </span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center size-9 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-brand-primary-dark)] hover:bg-[color:var(--color-paper-dim)] transition-colors"
          >
            {menuOpen ? (
              <X className="size-4.5" aria-hidden />
            ) : (
              <Menu className="size-4.5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)]/95 backdrop-blur-xl"
          >
            <ul className="container-page py-3 flex flex-col gap-0.5">
              {LINKS.map((l) => {
                const active =
                  pathname === l.href ||
                  (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "block rounded-lg px-4 py-2.5 text-[15px] transition-colors",
                        active
                          ? "bg-[color:var(--color-brand-accent)]/12 text-[color:var(--color-brand-primary)]"
                          : "text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
