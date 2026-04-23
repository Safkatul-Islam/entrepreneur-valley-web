"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "accent";
  className?: string;
  children: React.ReactNode;
};

export function MagneticButton({
  variant = "primary",
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.2 });
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const styles = {
    primary:
      "bg-[var(--color-brand-primary)] text-[color:var(--color-brand-cream)] hover:bg-[var(--color-brand-primary-dark)]",
    outline:
      "border border-[color:var(--color-brand-primary-dark)] text-[color:var(--color-brand-primary-dark)] hover:bg-[var(--color-brand-primary-dark)] hover:text-[color:var(--color-brand-cream)]",
    accent:
      "bg-[var(--color-brand-accent)] text-[color:var(--color-brand-primary-dark)] hover:bg-[var(--color-brand-accent-bright)]",
  } as const;

  return (
    <motion.span
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link
        ref={ref}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm md:text-base font-medium transition-colors",
          styles[variant],
          className
        )}
        {...rest}
      >
        {children}
      </Link>
    </motion.span>
  );
}
