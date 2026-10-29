import type * as React from "react";

import { cn } from "@veil-ui/utils";

const tones = {
  success: {
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  warning: {
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  danger: {
    badge: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  info: {
    badge: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  neutral: {
    badge: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
} as const;

interface StatusBadgeProps extends React.ComponentProps<"span"> {
  status?: keyof typeof tones;
}

function StatusBadge({
  status = "neutral",
  className,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      data-slot="status-badge"
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        tones[status].badge,
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", tones[status].dot)}
      />
      {children}
    </span>
  );
}

export { StatusBadge };
export type { StatusBadgeProps };
