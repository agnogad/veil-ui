"use client";

import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
} from "../bottom-sheet/index";

interface MobilePickerOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MobilePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  options: MobilePickerOption[];
  value?: string;
  onSelect: (value: string) => void;
}

function MobilePicker({
  open,
  onOpenChange,
  title,
  description,
  options,
  value,
  onSelect,
}: MobilePickerProps) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          {description ? (
            <BottomSheetDescription>{description}</BottomSheetDescription>
          ) : null}
        </BottomSheetHeader>
        <div role="radiogroup" aria-label={title} className="grid gap-1">
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  onSelect(option.value);
                  onOpenChange(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                  selected && "bg-accent/60 font-medium",
                )}
              >
                {option.icon ? (
                  <span className="text-muted-foreground [&_svg]:size-4">
                    {option.icon}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{option.label}</span>
                  {option.description ? (
                    <span className="block truncate text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  ) : null}
                </span>
                {selected ? (
                  <Check className="size-4 text-primary" aria-hidden />
                ) : null}
              </button>
            );
          })}
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export { MobilePicker };
export type { MobilePickerOption, MobilePickerProps };
