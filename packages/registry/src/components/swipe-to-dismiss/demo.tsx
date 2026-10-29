"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { SwipeToDismiss } from "./index";

const initial = [
  { id: 1, title: "Deployment finished", body: "Production is up to date." },
  { id: 2, title: "New comment", body: "Mira replied on “Design tokens”." },
  { id: 3, title: "Weekly digest", body: "Your team shipped 12 changes." },
];

export function SwipeToDismissBasic() {
  const [items, setItems] = useState(initial);

  return (
    <div className="grid w-full max-w-sm gap-2">
      {items.map((item) => (
        <SwipeToDismiss
          key={item.id}
          onDismiss={() =>
            setItems((current) => current.filter((entry) => entry.id !== item.id))
          }
        >
          <div className="flex items-start gap-3 p-4 pr-10">
            <Bell className="mt-0.5 size-4 text-muted-foreground" aria-hidden />
            <div className="text-sm">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.body}</p>
            </div>
          </div>
        </SwipeToDismiss>
      ))}
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          All caught up.
        </p>
      ) : null}
    </div>
  );
}

export function SwipeToDismissCustomThreshold() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full max-w-sm">
      {visible ? (
        <SwipeToDismiss
          threshold={140}
          dismissLabel="Dismiss tip"
          onDismiss={() => setVisible(false)}
        >
          <div className="p-4 pr-10 text-sm">
            <p className="font-medium">Swipe farther to dismiss</p>
            <p className="text-xs text-muted-foreground">
              This card requires a 140px swipe.
            </p>
          </div>
        </SwipeToDismiss>
      ) : (
        <p className="text-sm text-muted-foreground">Tip dismissed.</p>
      )}
    </div>
  );
}
