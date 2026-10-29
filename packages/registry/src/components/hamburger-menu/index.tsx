"use client";

import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface HamburgerMenuProps
  extends Omit<React.ComponentProps<"button">, "onClick" | "children"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
}

function HamburgerMenu({
  open,
  onOpenChange,
  label = "Toggle navigation",
  className,
  ...props
}: HamburgerMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  function toggle() {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <button
      type="button"
      data-slot="hamburger-menu"
      data-state={isOpen ? "open" : "closed"}
      aria-label={label}
      aria-expanded={isOpen}
      onClick={toggle}
      className={cn(
        "inline-flex size-9 flex-col items-center justify-center gap-1.5 rounded-md border transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "h-px w-4 bg-foreground transition-transform",
            isOpen && index === 0 && "translate-y-[7px] rotate-45",
            isOpen && index === 1 && "opacity-0",
            isOpen && index === 2 && "-translate-y-[7px] -rotate-45",
          )}
        />
      ))}
    </button>
  );
}

export { HamburgerMenu };
export type { HamburgerMenuProps };
