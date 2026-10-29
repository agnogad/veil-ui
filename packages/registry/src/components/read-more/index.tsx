"use client";

import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const clamps = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
} as const;

interface ReadMoreProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  children: React.ReactNode;
  lines?: keyof typeof clamps;
  moreLabel?: string;
  lessLabel?: string;
  defaultExpanded?: boolean;
}

function ReadMore({
  children,
  lines = 3,
  moreLabel = "Read more",
  lessLabel = "Show less",
  defaultExpanded = false,
  className,
  ...props
}: ReadMoreProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div data-slot="read-more" className={cn("grid gap-2", className)} {...props}>
      <div className={expanded ? undefined : clamps[lines]}>{children}</div>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="w-fit rounded-sm text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {expanded ? lessLabel : moreLabel}
      </button>
    </div>
  );
}

export { ReadMore };
export type { ReadMoreProps };
