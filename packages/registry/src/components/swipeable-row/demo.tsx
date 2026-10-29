"use client";

import { Archive, Trash2 } from "lucide-react";
import { useState } from "react";

import { SwipeableRow } from "./index";

const initial = ["Invoice #1042", "Weekly digest", "Design review notes"];

export function SwipeableRowBasic() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-background">
      {initial.map((item) => (
        <SwipeableRow
          key={item}
          className="border-b last:border-b-0"
          actions={[
            {
              label: "Delete",
              icon: <Trash2 aria-hidden />,
              destructive: true,
              onClick: () => {},
            },
          ]}
        >
          <div className="px-4 py-3 text-sm">
            <p className="font-medium">{item}</p>
            <p className="text-xs text-muted-foreground">Swipe left for actions</p>
          </div>
        </SwipeableRow>
      ))}
    </div>
  );
}

export function SwipeableRowTwoActions() {
  const [items, setItems] = useState(initial);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-background">
      {items.map((item) => (
        <SwipeableRow
          key={item}
          className="border-b last:border-b-0"
          actions={[
            {
              label: "Archive",
              icon: <Archive aria-hidden />,
              onClick: () => {},
            },
            {
              label: "Delete",
              icon: <Trash2 aria-hidden />,
              destructive: true,
              onClick: () =>
                setItems((current) => current.filter((entry) => entry !== item)),
            },
          ]}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="font-medium">{item}</span>
            <span className="text-xs text-muted-foreground">2 actions</span>
          </div>
        </SwipeableRow>
      ))}
    </div>
  );
}
