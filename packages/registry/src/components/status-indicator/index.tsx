import type * as React from "react";

import { cn } from "@veil-ui/utils";

const tones = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  busy: "bg-red-500",
  away: "bg-amber-500",
} as const;

interface StatusIndicatorProps extends React.ComponentProps<"span"> {
  status?: keyof typeof tones;
  label?: string;
  pulse?: boolean;
}

function StatusIndicator({
  status = "online",
  label,
  pulse = false,
  className,
  ...props
}: StatusIndicatorProps) {
  return (
    <span
      data-slot="status-indicator"
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="relative flex size-2" aria-hidden>
        {pulse ? (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              tones[status],
            )}
          />
        ) : null}
        <span
          className={cn("relative inline-flex size-2 rounded-full", tones[status])}
        />
      </span>
      {label ?? status}
    </span>
  );
}

export { StatusIndicator };
export type { StatusIndicatorProps };
