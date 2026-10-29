"use client";

import { Star } from "lucide-react";
import { useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface RatingInputProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  /** Accessible name for the rating group. */
  label?: string;
  /** Show the numeric value next to the stars. */
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const iconSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

function RatingInput({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  readOnly = false,
  disabled = false,
  label = "Rating",
  showValue = false,
  size = "md",
  className,
}: RatingInputProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const isControlled = value !== undefined;
  const interactive = !readOnly && !disabled;

  function commit(next: number) {
    if (!interactive) return;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  function onKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) {
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = Math.min(max, index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = Math.max(1, index - 1);
    } else if (event.key === "Home") {
      next = 1;
    } else if (event.key === "End") {
      next = max;
    }

    if (next === null) return;
    event.preventDefault();
    commit(next);
    refs.current[next - 1]?.focus();
  }

  return (
    <div
      data-slot="rating-input"
      className={cn("flex items-center gap-2", className)}
    >
      <div
        role="radiogroup"
        aria-label={label}
        aria-readonly={readOnly || undefined}
        aria-disabled={disabled || undefined}
        className="flex items-center gap-0.5"
      >
        {Array.from({ length: max }, (_, position) => {
          const star = position + 1;
          const checked = current === star;
          const filled = star <= current;

          return (
            <button
              key={star}
              ref={(node) => {
                refs.current[position] = node;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              tabIndex={checked || (current === 0 && star === 1) ? 0 : -1}
              disabled={disabled}
              onClick={() => commit(checked ? 0 : star)}
              onKeyDown={(event) => onKeyDown(star, event)}
              className={cn(
                "rounded-sm p-0.5 text-muted-foreground/50 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                interactive && "hover:text-amber-400",
                filled && "text-amber-400",
              )}
            >
              <Star
                className={cn(iconSizes[size], filled && "fill-current")}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm tabular-nums text-muted-foreground">
          {current} / {max}
        </span>
      )}
    </div>
  );
}

export { RatingInput };
