"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Checkbox } from "../checkbox/index";

interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  /** Heading inside the popover. */
  label?: string;
  disabled?: boolean;
  className?: string;
}

function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select options",
  label = "Options",
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const selected = value ?? internal;
  const isControlled = value !== undefined;

  const selectedLabels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => option.label);

  function toggle(optionValue: string, checked: boolean | "indeterminate") {
    const next = checked
      ? [...selected, optionValue]
      : selected.filter((item) => item !== optionValue);

    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            selectedLabels.length === 0 && "text-muted-foreground",
            className,
          )}
        >
          <span className="truncate">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : placeholder}
          </span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="multiselect-content"
          aria-label={label}
          align="start"
          sideOffset={4}
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"
        >
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            {label}
          </p>
          <div role="group" aria-label={label} className="grid">
            {options.map((option) => {
              const checked = selected.includes(option.value);
              const optionId = `${id}-${option.value}`;
              return (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                    option.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <Checkbox
                    id={optionId}
                    checked={checked}
                    disabled={option.disabled}
                    onCheckedChange={(next) => toggle(option.value, next)}
                  />
                  <label
                    htmlFor={optionId}
                    className="flex-1 cursor-pointer select-none"
                  >
                    {option.label}
                  </label>
                  {checked ? (
                    <Check className="size-4" aria-hidden />
                  ) : null}
                </div>
              );
            })}
          </div>
          {selected.length > 0 ? (
            <div className="mt-1 border-t pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  if (!isControlled) setInternal([]);
                  onValueChange?.([]);
                }}
              >
                Clear selection
              </Button>
            </div>
          ) : null}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { MultiSelect };
export type { MultiSelectOption, MultiSelectProps };
