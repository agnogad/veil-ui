"use client";

import { useState } from "react";

import { PullToRefresh } from "./index";

const seed = ["Morning stand-up", "Design review", "Ship changelog"];

export function PullToRefreshBasic() {
  const [items, setItems] = useState(seed);

  return (
    <PullToRefresh
      className="w-full max-w-sm"
      onRefresh={async () => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setItems((current) => [
          `Refreshed at ${new Date().toLocaleTimeString()}`,
          ...current,
        ]);
      }}
    >
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item} className="px-4 py-3 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </PullToRefresh>
  );
}

export function PullToRefreshList() {
  const [items, setItems] = useState(seed.slice(0, 1));

  return (
    <PullToRefresh
      className="w-full max-w-sm"
      onRefresh={() => {
        setItems(seed);
      }}
    >
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item} className="px-4 py-3 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </PullToRefresh>
  );
}
