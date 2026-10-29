"use client";

import { useState } from "react";

import { Combobox } from "./index";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "vite", label: "Vite" },
];

export function ComboboxBasic() {
  const [value, setValue] = useState("next");

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework"
        label="Framework"
      />
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  );
}

export function ComboboxDisabled() {
  return (
    <Combobox
      options={frameworks}
      placeholder="Unavailable"
      label="Framework"
      disabled
      className="max-w-xs"
    />
  );
}
