"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "./index";

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const formatLong = (date: Date) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(date);

export function CalendarBasic() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-3">
      <Calendar mode="single" selected={date} onSelect={setDate} />
      <p className="text-sm text-muted-foreground">
        {date ? formatLong(date) : "No date selected"}
      </p>
    </div>
  );
}

export function CalendarRange() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  return (
    <Calendar mode="range" selected={range} onSelect={setRange} />
  );
}

export function CalendarDropdown() {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}

export function CalendarDisabled() {
  const today = new Date();

  return (
    <Calendar
      mode="single"
      disabled={[{ before: today }, { dayOfWeek: [0, 6] }]}
      defaultMonth={today}
    />
  );
}
