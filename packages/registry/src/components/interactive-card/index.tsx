"use client";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card } from "../card/index";

interface InteractiveCardProps extends React.ComponentProps<"div"> {
  disabled?: boolean;
}

function InteractiveCard({
  className,
  disabled,
  onClick,
  onKeyDown,
  children,
  ...props
}: InteractiveCardProps) {
  return (
    <Card
      data-slot="interactive-card"
      data-disabled={disabled || undefined}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.currentTarget.click();
        }
        onKeyDown?.(event);
      }}
      className={cn(
        "cursor-pointer transition-colors hover:border-ring/60 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "cursor-not-allowed opacity-60 hover:border-border hover:bg-card",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export { InteractiveCard, type InteractiveCardProps };
