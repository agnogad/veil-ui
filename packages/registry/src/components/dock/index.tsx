"use client";

import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface DockItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

interface DockProps extends React.ComponentProps<"div"> {
  items: DockItem[];
  label?: string;
}

function Dock({
  items,
  label = "Dock",
  className,
  ...props
}: DockProps) {
  return (
    <div
      data-slot="dock"
      role="toolbar"
      aria-label={label}
      className={cn(
        "inline-flex items-end gap-1.5 rounded-2xl border bg-background/80 p-2 shadow-lg backdrop-blur",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const IconComponent = item.icon;
        const content = (
          <>
            <IconComponent className="size-5" aria-hidden />
            <span className="sr-only">{item.label}</span>
            {item.active ? (
              <span
                aria-hidden
                className="absolute -bottom-0.5 size-1 rounded-full bg-foreground"
              />
            ) : null}
          </>
        );
        const classes = cn(
          "group relative flex size-11 items-center justify-center rounded-xl border bg-card text-muted-foreground transition-transform hover:-translate-y-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          item.active && "border-foreground/30 text-foreground",
        );

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            title={item.label}
            aria-current={item.active ? "page" : undefined}
            className={classes}
          >
            {content}
          </a>
        ) : (
          <button
            key={item.label}
            type="button"
            title={item.label}
            aria-current={item.active ? "true" : undefined}
            onClick={item.onClick}
            className={classes}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

export { Dock };
export type { DockItem, DockProps };
