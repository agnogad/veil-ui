"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "../button/index";
import { DateRangePicker } from "./index";

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export function DateRangePickerBasic() {
  const [range, setRange] = useState<DateRange | undefined>();

  return <DateRangePicker value={range} onValueChange={setRange} />;
}

const presets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

export function DateRangePickerPresets() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <div className="flex flex-col gap-3">
      <DateRangePicker value={range} onValueChange={setRange} />
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const to = new Date();
              setRange({ from: addDays(to, -preset.days), to });
            }}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function DateRangePickerSingleMonth() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      label="Billing period"
      numberOfMonths={1}
      value={range}
      onValueChange={setRange}
    />
  );
}
