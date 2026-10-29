"use client";

import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobilePageIndicatorProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  count: number;
  index: number;
  onSelect?: (index: number) => void;
  label?: string;
}

function MobilePageIndicator({
  className,
  count,
  index,
  onSelect,
  label = "Pages",
  ...props
}: MobilePageIndicatorProps) {
  return (
    <div
      data-slot="mobile-page-indicator"
      role="group"
      aria-label={label}
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, page) => {
        const active = page === index;
        const dotClassName = cn(
          "h-1.5 rounded-full transition-all",
          active ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30",
        );

        if (!onSelect) {
          return (
            <span
              key={page}
              aria-current={active ? "true" : undefined}
              className={dotClassName}
            />
          );
        }

        return (
          <button
            key={page}
            type="button"
            aria-label={`Go to page ${page + 1}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(page)}
            className={cn(
              dotClassName,
              "outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <span className="sr-only">Page {page + 1}</span>
          </button>
        );
      })}
      <span className="sr-only">
        Page {index + 1} of {count}
      </span>
    </div>
  );
}

export { MobilePageIndicator };
export type { MobilePageIndicatorProps };
