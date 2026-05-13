import Link from "next/link";
import Image from "next/image";

const SOCIALS = [
  { label: "Discord", href: "https://discord.gg/cMkdZQGCSE" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

const PAGES = [
  { label: "Mission", href: "/mission" },
  { label: "Sharks\u2019 Valley", href: "/sharks-valley" },
  { label: "Board", href: "/board" },
  { label: "FAQ", href: "/faq" },
  { label: "Register", href: "/register/sharks-valley" },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-brand-primary-dark)] text-[color:var(--color-brand-cream)] overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-28 -right-12 opacity-[0.05] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={480}
          height={480}
          className="w-[480px] h-auto"
        />
      </div>

      <div className="container-page relative py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-ev.png"
                alt="Entrepreneur Valley"
                width={56}
                height={56}
                className="size-12 object-contain"
              />
              <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-[0.95]">
                Entrepreneur&rsquo;s
                <br />
                <em className="not-italic text-[color:var(--color-brand-cream)]">
                  Valley.
                </em>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[color:var(--color-brand-cream)]/60 text-sm leading-relaxed">
              A student-led home for builders, founders, and the relentlessly
              curious at Santa Monica College.
            </p>
          </div>

          <FooterCol title="Pages" items={PAGES} />
          <FooterCol
            title="Location"
            items={[
              {
                label: "1900 Pico Blvd,",
                href: "https://maps.google.com/?q=1900+Pico+Blvd+Santa+Monica+CA",
              },
              { label: "Santa Monica, CA", href: "#" },
            ]}
          />
          <FooterCol title="Social" items={SOCIALS} />
        </div>

        <div className="mt-12 pt-6 border-t border-[color:var(--color-brand-cream)]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-[color:var(--color-brand-cream)]/45">
          <span>&copy; {new Date().getFullYear()} Entrepreneur&rsquo;s Valley &middot; SMC</span>
          <span className="font-[family-name:var(--font-mono)] tracking-wider">
            Built with intent &mdash; not templates.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="eyebrow text-[color:var(--color-brand-cream)]/80">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href}
              className="text-[color:var(--color-brand-cream)]/55 hover:text-[color:var(--color-brand-cream)] transition-colors"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
