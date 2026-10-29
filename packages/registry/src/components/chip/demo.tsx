"use client";

import { useState } from "react";

import { Chip } from "./index";

export function ChipBasic() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip variant="muted">React</Chip>
      <Chip variant="muted">TypeScript</Chip>
      <Chip variant="muted">Tailwind</Chip>
    </div>
  );
}

export function ChipFilter() {
  const options = ["Design", "Engineering", "Product"];
  const [selected, setSelected] = useState<string[]>(["Design"]);

  function toggle(option: string) {
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);

        return (
          <Chip
            key={option}
            asChild
            variant={active ? "default" : "outline"}
          >
            <button
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option)}
            >
              {option}
            </button>
          </Chip>
        );
      })}
    </div>
  );
}
