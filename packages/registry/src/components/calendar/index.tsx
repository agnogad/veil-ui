"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import type * as React from "react";
import {
  DayPicker,
  UI,
  type ClassNames,
  type DayButtonProps,
  type ChevronProps,
} from "react-day-picker";

import { cn } from "@veil-ui/utils";

const navButton =
  "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";

const calendarClassNames = {
  [UI.Root]: "w-fit",
  [UI.Months]: "relative flex flex-col gap-4 sm:flex-row",
  [UI.Month]: "flex w-full flex-col gap-4",
  [UI.MonthCaption]: "relative flex h-8 items-center justify-center",
  [UI.CaptionLabel]: "text-sm font-medium",
  [UI.Nav]: "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
  [UI.PreviousMonthButton]: cn(navButton, "left-0"),
  [UI.NextMonthButton]: cn(navButton, "right-0"),
  [UI.Chevron]: "size-4",
  [UI.MonthGrid]: "w-full border-collapse",
  [UI.Weekdays]: "flex",
  [UI.Weekday]:
    "w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",
  [UI.Weeks]: "mt-2 flex flex-col gap-1",
  [UI.Week]: "flex w-full",
  [UI.Day]: "relative size-9 p-0 text-center text-sm",
  [UI.DayButton]: "size-9",
  outside: "",
  selected: "",
  today: "",
  disabled: "",
  hidden: "invisible",
  [UI.Footer]: "mt-2 text-sm text-muted-foreground",
  [UI.Dropdowns]: "flex items-center gap-1",
  [UI.Dropdown]: "rounded-md border border-input bg-transparent px-2 py-1 text-sm",
  [UI.DropdownRoot]: "relative",
} satisfies Partial<ClassNames>;

function CalendarChevron({
  orientation = "right",
  className,
  style,
}: ChevronProps) {
  const Icon =
    orientation === "left"
      ? ChevronLeft
      : orientation === "up"
        ? ChevronUp
        : orientation === "down"
          ? ChevronDown
          : ChevronRight;

  return (
    <Icon className={cn("size-4", className)} style={style} aria-hidden />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: DayButtonProps) {
  const selected = Boolean(modifiers.selected);
  const rangeMiddle = Boolean(modifiers.range_middle);

  return (
    <button
      type="button"
      data-slot="calendar-day"
      data-range-middle={rangeMiddle || undefined}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-accent hover:text-accent-foreground",
        modifiers.outside && "text-muted-foreground/50",
        modifiers.today && !selected && "bg-accent text-accent-foreground",
        rangeMiddle && "rounded-none bg-accent text-accent-foreground",
        selected &&
          !rangeMiddle &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        className,
      )}
      {...props}
    >
      {day.date.getDate()}
    </button>
  );
}

function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit p-3", className)}
      classNames={{ ...calendarClassNames, ...classNames }}
      components={{
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

export { Calendar };
