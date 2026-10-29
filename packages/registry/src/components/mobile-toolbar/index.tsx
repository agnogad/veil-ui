"use client";

import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobileToolbarItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}

interface MobileToolbarProps extends React.ComponentProps<"div"> {
  items: MobileToolbarItem[];
  "aria-label"?: string;
}

function MobileToolbar({
  className,
  items,
  "aria-label": ariaLabel = "Toolbar",
  ...props
}: MobileToolbarProps) {
  return (
    <div
      data-slot="mobile-toolbar"
      role="toolbar"
      aria-label={ariaLabel}
      className={cn(
        "flex w-full items-center gap-1 overflow-x-auto border-y bg-background px-2 py-1.5 [scrollbar-width:none]",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          aria-pressed={item.active}
          className={cn(
            "relative inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
            item.active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {item.icon ? (
            <span className="[&_svg]:size-3.5" aria-hidden>
              {item.icon}
            </span>
          ) : null}
          <span>{item.label}</span>
          {item.badge !== undefined ? (
            <span className="rounded-full bg-muted px-1.5 text-[10px] leading-4 text-muted-foreground">
              {item.badge}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export { MobileToolbar };
export type { MobileToolbarItem, MobileToolbarProps };
