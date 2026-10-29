"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarRangeIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Calendar } from "../calendar/index";

interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  /** Accessible name for the trigger. */
  label?: string;
  disabled?: boolean;
  className?: string;
  /** Number of months shown side by side. */
  numberOfMonths?: number;
  /** Month shown when nothing is selected. */
  defaultMonth?: Date;
}

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  label = "Choose date range",
  disabled = false,
  className,
  numberOfMonths = 2,
  defaultMonth,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [internal, setInternal] = useState<DateRange | undefined>(defaultValue);
  const selected = value ?? internal;
  const isControlled = value !== undefined;

  const summary = selected?.from
    ? selected.to
      ? `${formatDay(selected.from)} – ${formatDay(selected.to)}`
      : formatDay(selected.from)
    : placeholder;

  function select(range: DateRange | undefined) {
    if (!isControlled) setInternal(range);
    onValueChange?.(range);

    if (!editing) {
      setEditing(true);
      return;
    }
    if (range?.from && range.to) setOpen(false);
  }

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setEditing(false);
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-72 justify-start font-normal",
            !selected?.from && "text-muted-foreground",
            className,
          )}
        >
          <CalendarRangeIcon className="size-4 opacity-60" />
          <span className="truncate">{summary}</span>
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="date-range-picker-content"
          aria-label={label}
          align="start"
          sideOffset={4}
          className="z-50 w-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none"
        >
          <Calendar
            mode="range"
            numberOfMonths={numberOfMonths}
            selected={selected}
            defaultMonth={selected?.from ?? defaultMonth}
            onSelect={select}
            autoFocus
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { DateRangePicker };
