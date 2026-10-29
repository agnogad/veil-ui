"use client";

import { useState } from "react";

import { Autocomplete } from "./index";

const cities = [
  { value: "berlin", label: "Berlin" },
  { value: "istanbul", label: "Istanbul" },
  { value: "lisbon", label: "Lisbon" },
  { value: "tokyo", label: "Tokyo" },
];

export function AutocompleteBasic() {
  return (
    <div className="w-full max-w-xs">
      <Autocomplete
        options={cities}
        aria-label="City"
        placeholder="Search cities…"
        defaultValue="lisbon"
      />
    </div>
  );
}

export function AutocompleteKeyboard() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Autocomplete
        options={cities}
        aria-label="City"
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-muted-foreground">
        Selected: {value || "none"}
      </p>
    </div>
  );
}

export function AutocompleteEmpty() {
  return (
    <div className="w-full max-w-xs">
      <Autocomplete
        options={cities}
        aria-label="City"
        placeholder="Type “zzz” to see the empty state"
        defaultValue=""
        emptyMessage="No cities match that search."
      />
    </div>
  );
}
