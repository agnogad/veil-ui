"use client";

import { useRef } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SegmentedNavigationProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  options: SegmentedOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

function SegmentedNavigation({
  options,
  value,
  onValueChange,
  label = "Segmented navigation",
  className,
  ...props
}: SegmentedNavigationProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const total = options.length;

    for (let step = 1; step <= total; step += 1) {
      const next = ((index + direction * step) % total + total) % total;
      const option = options[next];
      if (option && !option.disabled) {
        refs.current[next]?.focus();
        onValueChange?.(option.value);
        return;
      }
    }
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      data-slot="segmented-navigation"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border bg-muted p-1",
        className,
      )}
      {...props}
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          disabled={option.disabled}
          onClick={() => onValueChange?.(option.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className={cn(
            "rounded-md px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            option.value === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export { SegmentedNavigation };
export type { SegmentedOption, SegmentedNavigationProps };
