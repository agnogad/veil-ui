"use client";

import { ChevronLeft } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobileHeaderProps extends Omit<React.ComponentProps<"header">, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Shows a back button when provided. */
  onBack?: () => void;
  actions?: React.ReactNode;
  sticky?: boolean;
}

function MobileHeader({
  className,
  title,
  subtitle,
  onBack,
  actions,
  sticky = true,
  ...props
}: MobileHeaderProps) {
  return (
    <header
      data-slot="mobile-header"
      className={cn(
        "z-30 border-b bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    >
      <div className="flex h-14 items-center gap-2 px-3">
        {onBack ? (
          <button
            type="button"
            aria-label="Go back"
            onClick={onBack}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">{title}</p>
          {subtitle ? (
            <p className="truncate text-xs text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-1">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}

export { MobileHeader };
export type { MobileHeaderProps };
