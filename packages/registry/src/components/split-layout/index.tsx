import type * as React from "react";

import { cn } from "@veil-ui/utils";

const grids = {
  start: {
    sm: "lg:grid-cols-[240px_1fr]",
    md: "lg:grid-cols-[320px_1fr]",
    lg: "lg:grid-cols-[400px_1fr]",
  },
  end: {
    sm: "lg:grid-cols-[1fr_240px]",
    md: "lg:grid-cols-[1fr_320px]",
    lg: "lg:grid-cols-[1fr_400px]",
  },
} as const;

const gaps = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
} as const;

interface SplitLayoutProps extends React.ComponentProps<"div"> {
  /** Secondary pane. */
  aside: React.ReactNode;
  asidePosition?: "start" | "end";
  asideSize?: "sm" | "md" | "lg";
  gap?: keyof typeof gaps;
  stickyAside?: boolean;
}

function SplitLayout({
  className,
  aside,
  asidePosition = "end",
  asideSize = "md",
  gap = "md",
  stickyAside = false,
  children,
  ...props
}: SplitLayoutProps) {
  const asideClassName = cn(
    "min-w-0",
    stickyAside && "lg:sticky lg:top-4 lg:self-start",
  );

  return (
    <div
      data-slot="split-layout"
      className={cn(
        "grid min-h-0 grid-cols-1",
        grids[asidePosition][asideSize],
        gaps[gap],
        className,
      )}
      {...props}
    >
      {asidePosition === "start" ? (
        <aside data-slot="split-layout-aside" className={asideClassName}>
          {aside}
        </aside>
      ) : null}
      <div data-slot="split-layout-main" className="min-w-0">
        {children}
      </div>
      {asidePosition === "end" ? (
        <aside data-slot="split-layout-aside" className={asideClassName}>
          {aside}
        </aside>
      ) : null}
    </div>
  );
}

export { SplitLayout };
