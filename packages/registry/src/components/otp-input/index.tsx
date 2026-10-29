"use client";

import { useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface OtpInputProps {
  /** Number of digits. Defaults to 6. */
  length?: number;
  /** Current value as a digit string. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  /** Accessible name for the group and each digit. */
  label?: string;
  disabled?: boolean;
  className?: string;
}

function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  label = "One-time code",
  disabled = false,
  className,
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [internal, setInternal] = useState<string[]>(() =>
    Array.from({ length }, (_, index) => defaultValue[index] ?? ""),
  );
  const isControlled = value !== undefined;
  const chars = isControlled
    ? Array.from({ length }, (_, index) => value[index] ?? "")
    : internal;

  function commit(next: string[]) {
    if (!isControlled) setInternal(next);
    const code = next.join("");
    onValueChange?.(code);
    if (next.every((char) => char !== "")) onComplete?.(code);
  }

  function focus(index: number) {
    const input = refs.current[Math.min(Math.max(index, 0), length - 1)];
    input?.focus();
    input?.select();
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...chars];

    if (!digit) {
      next[index] = "";
      commit(next);
      return;
    }

    next[index] = digit;
    commit(next);

    const nextEmpty = next.findIndex(
      (char, position) => position > index && char === "",
    );
    focus(nextEmpty === -1 ? index + 1 : nextEmpty);
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
    } else if (event.key === "Backspace" && chars[index] === "") {
      event.preventDefault();
      const next = [...chars];
      if (index > 0) {
        next[index - 1] = "";
        commit(next);
        focus(index - 1);
      }
    } else if (event.key === "Home") {
      event.preventDefault();
      focus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focus(length - 1);
    }
  }

  function handlePaste(
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>,
  ) {
    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length - index);
    if (digits.length === 0) return;

    event.preventDefault();
    const next = [...chars];
    digits.split("").forEach((digit, offset) => {
      next[index + offset] = digit;
    });
    commit(next);
    focus(index + digits.length);
  }

  return (
    <div
      role="group"
      aria-label={label}
      data-slot="otp-input"
      className={cn("flex items-center gap-2", className)}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          pattern="[0-9]*"
          maxLength={1}
          value={chars[index]}
          disabled={disabled}
          aria-label={`${label}, digit ${index + 1}`}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className="size-10 rounded-md border border-input bg-transparent text-center text-lg font-medium tabular-nums shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
      ))}
    </div>
  );
}

export { OtpInput };
