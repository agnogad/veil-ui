"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, Pipette } from "lucide-react";
import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

const defaultPresets = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

interface ColorPickerProps {
  /** Hex color such as `#3b82f6`. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Swatches shown in the popover. */
  presets?: string[];
  /** Accessible name for the trigger and controls. */
  label?: string;
  disabled?: boolean;
  className?: string;
}

function normalizeHex(input: string) {
  const raw = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(raw)) {
    return `#${raw
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }
  if (/^[0-9a-f]{6}$/.test(raw)) return `#${raw}`;
  return null;
}

function ColorPicker({
  value,
  defaultValue = "#3b82f6",
  onValueChange,
  presets = defaultPresets,
  label = "Choose color",
  disabled = false,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue);
  const [draft, setDraft] = useState<string | null>(null);
  const current = value ?? internal;
  const isControlled = value !== undefined;

  function commit(next: string) {
    const normalized = normalizeHex(next);
    if (!normalized) return false;
    if (!isControlled) setInternal(normalized);
    onValueChange?.(normalized);
    setDraft(null);
    return true;
  }

  function commitDraft() {
    if (draft === null) return;
    if (!commit(draft)) setDraft(null);
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-44 justify-start gap-2 font-normal", className)}
        >
          <span
            aria-hidden
            className="size-4 rounded-sm border"
            style={{ backgroundColor: current }}
          />
          <span className="uppercase tabular-nums">{current}</span>
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="color-picker-content"
          aria-label={label}
          align="start"
          sideOffset={4}
          className="z-50 w-60 rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-none"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <Pipette className="size-4 text-muted-foreground" aria-hidden />
          </div>

          <input
            type="color"
            aria-label={`${label}, native picker`}
            value={current}
            disabled={disabled}
            onChange={(event) => commit(event.target.value)}
            className="mt-3 h-9 w-full cursor-pointer rounded-md border border-input bg-transparent p-1"
          />

          <input
            type="text"
            aria-label={`${label}, hex value`}
            value={draft ?? current}
            spellCheck={false}
            disabled={disabled}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitDraft}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitDraft();
              }
              if (event.key === "Escape") setDraft(null);
            }}
            className="mt-3 h-9 w-full rounded-md border border-input bg-transparent px-3 font-mono text-sm uppercase outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />

          <div
            role="group"
            aria-label="Preset colors"
            className="mt-3 grid grid-cols-5 gap-2"
          >
            {presets.map((preset) => {
              const selected = preset.toLowerCase() === current.toLowerCase();
              return (
                <button
                  key={preset}
                  type="button"
                  aria-label={`Use ${preset}`}
                  aria-pressed={selected}
                  onClick={() => commit(preset)}
                  style={{ backgroundColor: preset }}
                  className="flex size-8 items-center justify-center rounded-md border outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {selected && (
                    <Check
                      className={cn(
                        "size-4",
                        preset === "#ffffff" || preset === "#fef08a"
                          ? "text-black"
                          : "text-white",
                      )}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { ColorPicker };
