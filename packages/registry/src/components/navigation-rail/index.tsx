"use client";

import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface NavigationRailItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
}

interface NavigationRailProps
  extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  items: NavigationRailItem[];
  label?: string;
  onSelect?: (item: NavigationRailItem) => void;
}

function NavigationRail({
  items,
  label = "Primary",
  onSelect,
  className,
  ...props
}: NavigationRailProps) {
  return (
    <nav
      data-slot="navigation-rail"
      aria-label={label}
      className={cn(
        "flex w-16 flex-col items-center gap-2 border-r bg-background py-3",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const IconComponent = item.icon;
        const classes = cn(
          "relative flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          item.active &&
            "bg-accent text-accent-foreground before:absolute before:-left-3 before:h-6 before:w-0.5 before:rounded-full before:bg-foreground",
        );

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            title={item.label}
            aria-current={item.active ? "page" : undefined}
            className={classes}
          >
            <IconComponent className="size-5" aria-hidden />
            <span className="sr-only">{item.label}</span>
          </a>
        ) : (
          <button
            key={item.label}
            type="button"
            title={item.label}
            aria-current={item.active ? "page" : undefined}
            onClick={() => onSelect?.(item)}
            className={classes}
          >
            <IconComponent className="size-5" aria-hidden />
            <span className="sr-only">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { NavigationRail };
export type { NavigationRailItem, NavigationRailProps };
