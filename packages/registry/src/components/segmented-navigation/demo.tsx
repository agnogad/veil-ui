"use client";

import { useState } from "react";

import { SegmentedNavigation } from "./index";

export function SegmentedNavigationBasic() {
  const [value, setValue] = useState("day");

  return (
    <SegmentedNavigation
      value={value}
      onValueChange={setValue}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
}

export function SegmentedNavigationDisabled() {
  return (
    <SegmentedNavigation
      value="day"
      options={[
        { value: "day", label: "Day" },
        { value: "year", label: "Year", disabled: true },
      ]}
    />
  );
}
