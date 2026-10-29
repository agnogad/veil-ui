"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ClockIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

interface TimePickerProps {
  /** Time in 24-hour `HH:mm` format. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Accessible name for the trigger. */
  label?: string;
  disabled?: boolean;
  /** Minute increment offered in the list. Defaults to 5. */
  minuteStep?: number;
  className?: string;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function parseTime(value: string | undefined) {
  const match = value?.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

const optionClass =
  "flex h-8 w-14 shrink-0 items-center justify-center rounded-md text-sm tabular-nums outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring";

function TimePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a time",
  label = "Choose time",
  disabled = false,
  minuteStep = 5,
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = value ?? internal;
  const isControlled = value !== undefined;
  const parsed = parseTime(current);

  const hours = Array.from({ length: 24 }, (_, index) => index);
  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, index) => index * minuteStep,
  );

  function commit(hoursValue: number, minutesValue: number) {
    const next = `${pad(hoursValue)}:${pad(minutesValue)}`;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
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
            "w-40 justify-start font-normal",
            !current && "text-muted-foreground",
            className,
          )}
        >
          <ClockIcon className="size-4 opacity-60" />
          {current ?? placeholder}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="time-picker-content"
          aria-label={label}
          align="start"
          sideOffset={4}
          className="z-50 rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--radix-popper-transform-origin)]"
        >
          <div className="flex gap-2">
            <div
              role="listbox"
              aria-label="Hours"
              className="flex max-h-52 w-16 flex-col gap-1 overflow-y-auto p-0.5"
            >
              {hours.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  role="option"
                  aria-selected={parsed?.hours === hour}
                  aria-label={`${pad(hour)} hours`}
                  onClick={() => commit(hour, parsed?.minutes ?? 0)}
                  className={cn(
                    optionClass,
                    parsed?.hours === hour &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  {pad(hour)}
                </button>
              ))}
            </div>
            <div
              role="listbox"
              aria-label="Minutes"
              className="flex max-h-52 w-16 flex-col gap-1 overflow-y-auto p-0.5"
            >
              {minutes.map((minute) => (
                <button
                  key={minute}
                  type="button"
                  role="option"
                  aria-selected={parsed?.minutes === minute}
                  aria-label={`${pad(minute)} minutes`}
                  onClick={() => commit(parsed?.hours ?? 0, minute)}
                  className={cn(
                    optionClass,
                    parsed?.minutes === minute &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  {pad(minute)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-end border-t pt-3">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { TimePicker };
