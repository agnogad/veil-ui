"use client";

import { useState } from "react";

import { TimePicker } from "./index";

export function TimePickerBasic() {
  const [time, setTime] = useState<string | undefined>("09:30");

  return (
    <div className="flex flex-col gap-3">
      <TimePicker value={time} onValueChange={setTime} />
      <p className="text-sm text-muted-foreground">
        {time ? `Selected: ${time}` : "No time selected"}
      </p>
    </div>
  );
}

export function TimePickerStep() {
  return (
    <TimePicker
      label="Meeting time"
      defaultValue="14:00"
      minuteStep={15}
    />
  );
}

export function TimePickerDisabled() {
  return <TimePicker disabled placeholder="Unavailable" />;
}
