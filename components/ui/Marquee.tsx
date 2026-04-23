"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export function Marquee({
  children,
  speed = 40,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  const style = { "--marquee-duration": `${speed}s` } as CSSProperties;
  return (
    <div
      className={cn(
        "group relative overflow-hidden marquee-mask",
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "flex gap-6 w-max marquee-track",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex gap-6 shrink-0">{children}</div>
        <div aria-hidden className="flex gap-6 shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
