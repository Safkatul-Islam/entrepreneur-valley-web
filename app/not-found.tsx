import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100svh] flex items-center">
      <div className="container-page">
        <div className="eyebrow">404</div>
        <h1 className="display-xl mt-4 text-balance">
          That page didn&rsquo;t{" "}
          <em className="not-italic text-[var(--color-brand-primary)]">
            ship.
          </em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[color:var(--color-ink-soft)]">
          Can&rsquo;t find what you&rsquo;re looking for. Let&rsquo;s get you
          back.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-[color:var(--color-paper)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-brand-primary)] transition-colors"
          >
            ← Back to Entrepreneur Valley
          </Link>
        </div>
      </div>
    </main>
  );
}
