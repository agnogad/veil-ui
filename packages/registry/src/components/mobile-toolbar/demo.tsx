"use client";

import { ArrowDownUp, Calendar, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { MobileToolbar } from "./index";

export function MobileToolbarBasic() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <MobileToolbar
        aria-label="List tools"
        items={[
          { label: "Filter", icon: <Filter />, badge: 2 },
          { label: "Sort", icon: <ArrowDownUp /> },
          { label: "Date", icon: <Calendar /> },
        ]}
      />
    </div>
  );
}

export function MobileToolbarViewSwitch() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <MobileToolbar
        aria-label="View options"
        items={[
          {
            label: "Grid",
            icon: <LayoutGrid />,
            active: view === "grid",
            onClick: () => setView("grid"),
          },
          {
            label: "List",
            icon: <List />,
            active: view === "list",
            onClick: () => setView("list"),
          },
        ]}
      />
      <p className="px-4 py-3 text-sm text-muted-foreground">
        Showing {view} view
      </p>
    </div>
  );
}
