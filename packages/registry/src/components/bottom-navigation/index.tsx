"use client";

import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface BottomNavigationItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  badge?: React.ReactNode;
}

interface BottomNavigationProps
  extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  items: BottomNavigationItem[];
  onSelect?: (item: BottomNavigationItem) => void;
}

function BottomNavigation({
  items,
  onSelect,
  className,
  ...props
}: BottomNavigationProps) {
  return (
    <nav
      data-slot="bottom-navigation"
      aria-label="Bottom"
      className={cn(
        "flex w-full items-stretch justify-around border-t bg-background pb-[env(safe-area-inset-bottom)]",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const IconComponent = item.icon;
        const content = (
          <>
            <span className="relative">
              <IconComponent className="size-5" aria-hidden />
              {item.badge ? (
                <span className="absolute -right-2 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-medium leading-4 text-primary-foreground">
                  {item.badge}
                </span>
              ) : null}
            </span>
            <span className="text-[11px] font-medium">{item.label}</span>
          </>
        );
        const classes = cn(
          "relative flex flex-1 flex-col items-center gap-1 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          item.active &&
            "text-foreground after:absolute after:inset-x-4 after:top-0 after:h-0.5 after:rounded-full after:bg-foreground",
        );

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={classes}
          >
            {content}
          </a>
        ) : (
          <button
            key={item.label}
            type="button"
            aria-current={item.active ? "page" : undefined}
            onClick={() => onSelect?.(item)}
            className={classes}
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}

export { BottomNavigation };
export type { BottomNavigationItem, BottomNavigationProps };
