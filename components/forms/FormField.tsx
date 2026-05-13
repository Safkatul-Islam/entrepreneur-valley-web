import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-xl border border-[color:var(--color-line)] bg-white/70 px-4 py-3 text-ink text-base outline-none transition-[border,box-shadow] placeholder:text-[color:var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[color:var(--color-brand-primary)]/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:ring-red-500/10";

export const darkInputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-[color:var(--color-brand-cream)] text-base outline-none transition-[border,box-shadow] placeholder:text-white/40 focus:border-[var(--color-brand-accent)] focus:ring-4 focus:ring-[color:var(--color-brand-accent)]/15 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:ring-red-500/15";

export function FormField({
  label,
  required,
  error,
  children,
  className,
  dark,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <label className={cn("block", className)}>
      <span
        className={cn(
          "mb-2 flex items-center gap-1 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest",
          dark
            ? "text-[color:var(--color-brand-cream)]/60"
            : "text-[color:var(--color-muted)]",
        )}
      >
        {label}
        {required && (
          <span className="text-red-400" aria-hidden>
            *
          </span>
        )}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-red-400">{error}</span>
      )}
    </label>
  );
}
