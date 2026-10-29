"use client";

import { useState } from "react";

import { MultiSelect } from "./index";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
];

export function MultiselectBasic() {
  return (
    <MultiSelect
      options={options}
      placeholder="Choose teams"
      label="Teams"
      className="max-w-xs"
    />
  );
}

export function MultiselectControlled() {
  const [selected, setSelected] = useState<string[]>(["design"]);

  return (
    <div className="grid w-full max-w-xs gap-2">
      <MultiSelect
        options={options}
        value={selected}
        onValueChange={setSelected}
        placeholder="Choose teams"
        label="Teams"
      />
      <p className="text-sm text-muted-foreground">
        Selected: {selected.length === 0 ? "none" : selected.join(", ")}
      </p>
    </div>
  );
}
