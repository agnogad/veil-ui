"use client";

import { useState } from "react";

import { Button } from "../button/index";
import { MobilePicker } from "./index";

const timezones = [
  { value: "utc", label: "UTC", description: "Coordinated Universal Time" },
  { value: "berlin", label: "Berlin", description: "Central European Time" },
  { value: "new-york", label: "New York", description: "Eastern Time" },
  { value: "tokyo", label: "Tokyo", description: "Japan Standard Time" },
];

export function MobilePickerBasic() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("utc");

  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border p-4">
      <div className="text-sm">
        <p className="font-medium">Timezone</p>
        <p className="text-xs text-muted-foreground">
          {timezones.find((zone) => zone.value === value)?.label}
        </p>
      </div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Change
      </Button>
      <MobilePicker
        open={open}
        onOpenChange={setOpen}
        title="Select timezone"
        description="Used for schedules and reports."
        options={timezones}
        value={value}
        onSelect={setValue}
      />
    </div>
  );
}

export function MobilePickerButton() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("standard");

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button onClick={() => setOpen(true)}>Choose plan</Button>
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
      <MobilePicker
        open={open}
        onOpenChange={setOpen}
        title="Plan"
        options={[
          { value: "standard", label: "Standard" },
          { value: "plus", label: "Plus" },
          { value: "enterprise", label: "Enterprise" },
        ]}
        value={value}
        onSelect={setValue}
      />
    </div>
  );
}
