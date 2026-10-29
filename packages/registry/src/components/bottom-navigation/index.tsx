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

type BottomNavigationVariant = "default" | "floating";

interface BottomNavigationProps
  extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  items: BottomNavigationItem[];
  onSelect?: (item: BottomNavigationItem) => void;
  variant?: BottomNavigationVariant;
}

function BottomNavigation({
  items,
  onSelect,
  variant = "default",
  className,
  ...props
}: BottomNavigationProps) {
  return (
    <nav
      data-slot="bottom-navigation"
      data-variant={variant}
      aria-label="Bottom"
      className={cn(
        "flex w-full items-stretch justify-around bg-background",
        variant === "default" &&
          "border-t pb-[env(safe-area-inset-bottom)]",
        variant === "floating" &&
          "mx-auto w-[calc(100%-2rem)] max-w-md gap-1 rounded-2xl border p-1 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80",
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
          "relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          item.active && variant === "default" && "text-foreground after:absolute after:inset-x-4 after:top-0 after:h-0.5 after:rounded-full after:bg-foreground",
          item.active && variant === "floating" && "bg-muted text-foreground",
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
export type {
  BottomNavigationItem,
  BottomNavigationProps,
  BottomNavigationVariant,
};
