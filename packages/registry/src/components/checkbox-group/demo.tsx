"use client";

import { useState } from "react";

import { CheckboxGroup } from "./index";

const options = [
  { value: "news", label: "Product news" },
  { value: "tips", label: "Tips and tricks" },
  { value: "billing", label: "Billing updates" },
];

export function CheckboxGroupBasic() {
  return (
    <CheckboxGroup label="Email preferences" options={options} />
  );
}

export function CheckboxGroupWithDescriptions() {
  return (
    <CheckboxGroup
      label="Notifications"
      options={[
        {
          value: "comments",
          label: "Comments",
          description: "Replies to your threads.",
        },
        {
          value: "mentions",
          label: "Mentions",
          description: "When someone @mentions you.",
        },
      ]}
    />
  );
}

export function CheckboxGroupControlled() {
  const [selected, setSelected] = useState<string[]>(["news"]);

  return (
    <div className="grid gap-2">
      <CheckboxGroup
        label="Email preferences"
        options={options}
        value={selected}
        onValueChange={setSelected}
      />
      <p className="text-sm text-muted-foreground">
        Selected: {selected.length === 0 ? "none" : selected.join(", ")}
      </p>
    </div>
  );
}
