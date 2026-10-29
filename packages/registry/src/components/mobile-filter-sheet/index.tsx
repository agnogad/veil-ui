"use client";

import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from "../bottom-sheet/index";

interface MobileFilterGroup {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

type MobileFilterValue = Record<string, string[]>;

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: MobileFilterGroup[];
  value?: MobileFilterValue;
  onApply: (value: MobileFilterValue) => void;
  onReset?: () => void;
  title?: string;
}

function MobileFilterSheet({
  open,
  onOpenChange,
  groups,
  value,
  onApply,
  onReset,
  title = "Filters",
}: MobileFilterSheetProps) {
  const [selected, setSelected] = useState<MobileFilterValue>(value ?? {});

  const toggle = (groupId: string, option: string) => {
    setSelected((current) => {
      const currentGroup = current[groupId] ?? [];
      const next = currentGroup.includes(option)
        ? currentGroup.filter((entry) => entry !== option)
        : [...currentGroup, option];
      return { ...current, [groupId]: next };
    });
  };

  const reset = () => {
    setSelected({});
    onReset?.();
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          <BottomSheetDescription>
            Narrow the results, then apply.
          </BottomSheetDescription>
        </BottomSheetHeader>
        <div className="grid gap-4">
          {groups.map((group) => (
            <fieldset key={group.id} className="grid gap-2">
              <legend className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {group.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const active = (selected[group.id] ?? []).includes(
                    option.value,
                  );
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(group.id, option.value)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background hover:bg-accent",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <BottomSheetFooter className="flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={reset}>
            Reset
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              onApply(selected);
              onOpenChange(false);
            }}
          >
            Apply filters
          </Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export { MobileFilterSheet };
export type { MobileFilterGroup, MobileFilterSheetProps, MobileFilterValue };
