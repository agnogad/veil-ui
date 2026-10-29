"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Calendar } from "../calendar/index";

interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** Accessible name for the trigger. */
  label?: string;
  disabled?: boolean;
  className?: string;
  formatDate?: (date: Date) => string;
  /** First selectable day. */
  fromDate?: Date;
  /** Last selectable day. */
  toDate?: Date;
}

function defaultFormatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  label = "Choose date",
  disabled = false,
  className,
  formatDate = defaultFormatDate,
  fromDate,
  toDate,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<Date | undefined>(defaultValue);
  const selected = value ?? internal;
  const isControlled = value !== undefined;

  const disabledMatchers = [
    ...(fromDate ? [{ before: fromDate }] : []),
    ...(toDate ? [{ after: toDate }] : []),
  ];

  function select(date: Date | undefined) {
    if (!isControlled) setInternal(date);
    onValueChange?.(date);
    setOpen(false);
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
          className={cn(
            "w-60 justify-start font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="size-4 opacity-60" />
          {selected ? formatDate(selected) : placeholder}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="date-picker-content"
          aria-label={label}
          align="start"
          sideOffset={4}
          className="z-50 w-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none"
        >
          <Calendar
            mode="single"
            selected={selected}
            defaultMonth={selected}
            onSelect={select}
            disabled={
              disabledMatchers.length > 0 ? disabledMatchers : undefined
            }
            autoFocus
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { DatePicker };
