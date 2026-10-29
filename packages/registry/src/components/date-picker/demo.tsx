"use client";

import { useState } from "react";

import { DatePicker } from "./index";

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const formatLong = (date: Date) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(date);

export function DatePickerBasic() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-3">
      <DatePicker value={date} onValueChange={setDate} />
      <p className="text-sm text-muted-foreground">
        {date ? formatLong(date) : "No date selected"}
      </p>
    </div>
  );
}

export function DatePickerControlled() {
  const value = addDays(new Date(), 7);

  return <DatePicker value={value} onValueChange={() => {}} label="Delivery date" />;
}

export function DatePickerDisabled() {
  const today = new Date();

  return (
    <DatePicker
      label="Appointment date"
      placeholder="Appointments open next week"
      fromDate={addDays(today, 7)}
      toDate={addDays(today, 30)}
    />
  );
}
