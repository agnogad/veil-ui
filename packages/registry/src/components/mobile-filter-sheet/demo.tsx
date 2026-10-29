"use client";

import { useState } from "react";

import { Button } from "../button/index";
import { MobileFilterSheet, type MobileFilterValue } from "./index";

const groups = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "design", label: "Design" },
      { value: "engineering", label: "Engineering" },
      { value: "marketing", label: "Marketing" },
    ],
  },
  {
    id: "price",
    label: "Price",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
];

export function MobileFilterSheetBasic() {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState<MobileFilterValue>({});

  const count = Object.values(applied).reduce(
    (total, values) => total + values.length,
    0,
  );

  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border p-4">
      <div className="text-sm">
        <p className="font-medium">Results</p>
        <p className="text-xs text-muted-foreground">
          {count} filter{count === 1 ? "" : "s"} applied
        </p>
      </div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Filters
      </Button>
      <MobileFilterSheet
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        value={applied}
        onApply={setApplied}
        onReset={() => setApplied({})}
      />
    </div>
  );
}

export function MobileFilterSheetPreset() {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState<MobileFilterValue>({
    category: ["design"],
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Button onClick={() => setOpen(true)}>Edit filters</Button>
      <p className="text-sm text-muted-foreground">
        {JSON.stringify(applied)}
      </p>
      <MobileFilterSheet
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        value={applied}
        onApply={setApplied}
      />
    </div>
  );
}
