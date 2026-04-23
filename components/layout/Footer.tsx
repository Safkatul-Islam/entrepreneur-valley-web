import Link from "next/link";
import Image from "next/image";

const SOCIALS = [
  { label: "Discord", href: "https://discord.gg/cMkdZQGCSE" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

const PAGES = [
  { label: "Mission", href: "#mission" },
  { label: "Sharks' Valley", href: "#sharks-valley" },
  { label: "Board", href: "#board" },
  { label: "FAQ", href: "#faq" },
  { label: "Register", href: "/register/sharks-valley" },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-brand-primary-dark)] text-[color:var(--color-brand-cream)] overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-16 opacity-[0.07] pointer-events-none"
      >
        <Image
          src="/logo-ev.png"
          alt=""
          width={520}
          height={520}
          className="w-[520px] h-auto"
        />
      </div>

      <div className="container-page relative py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/logo-ev.png"
                alt="Entrepreneur Valley"
                width={64}
                height={64}
                className="size-14 object-contain"
              />
              <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[0.95]">
                Entrepreneur&rsquo;s
                <br />
                <em className="not-italic text-[color:var(--color-brand-cream)]">
                  Valley.
                </em>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[color:var(--color-brand-cream)]/70 text-sm leading-relaxed">
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

        <div className="mt-16 pt-8 border-t border-[color:var(--color-brand-cream)]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[color:var(--color-brand-cream)]/60">
          <span>© {new Date().getFullYear()} Entrepreneur&rsquo;s Valley · SMC</span>
          <span className="font-[family-name:var(--font-mono)] tracking-wider">
            Built with intent — not templates.
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
      <div className="eyebrow text-[color:var(--color-brand-cream)]">
        {title}
      </div>
      <ul className="mt-5 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href}
              className="text-[color:var(--color-brand-cream)]/70 hover:text-[color:var(--color-brand-cream)] transition-colors"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
