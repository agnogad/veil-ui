"use client";

import { Minus, Plus } from "lucide-react";
import { useState, type ComponentProps } from "react";

import { cn } from "@veil-ui/utils";

interface NumberInputProps
  extends Omit<
    ComponentProps<"input">,
    "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
  > {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

function clamp(value: number, min?: number, max?: number) {
  let next = value;
  if (min !== undefined) next = Math.max(next, min);
  if (max !== undefined) next = Math.min(next, max);
  return next;
}

function NumberInput({
  className,
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  disabled,
  id,
  onValueChange,
  ...props
}: NumberInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [draft, setDraft] = useState<string | null>(null);

  const current = isControlled ? value : internal;
  const atMin = min !== undefined && current <= min;
  const atMax = max !== undefined && current >= max;

  function commit(next: number) {
    const clamped = clamp(Number(next.toFixed(10)), min, max);
    if (!isControlled) setInternal(clamped);
    onValueChange?.(clamped);
  }

  function nudge(direction: 1 | -1) {
    setDraft(null);
    commit(current + direction * step);
  }

  return (
    <div
      data-slot="number-input"
      className={cn(
        "flex h-9 w-full items-center overflow-hidden rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-[input[aria-invalid=true]]:border-destructive dark:bg-input/30",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Decrease value"
        disabled={disabled || atMin}
        onClick={() => nudge(-1)}
        className="inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        role="spinbutton"
        value={draft ?? String(current)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        onChange={(event) => {
          setDraft(event.target.value);
          const parsed = Number(event.target.value);
          if (event.target.value.trim() !== "" && Number.isFinite(parsed)) {
            commit(parsed);
          }
        }}
        onBlur={() => setDraft(null)}
        className="h-full w-full min-w-0 bg-transparent text-center text-sm tabular-nums outline-none [appearance:textfield] placeholder:text-muted-foreground [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label="Increase value"
        disabled={disabled || atMax}
        onClick={() => nudge(1)}
        className="inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}

export { NumberInput };
