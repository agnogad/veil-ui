import type * as React from "react";

import { cn } from "@veil-ui/utils";

const statuses = {
  online: {
    label: "Connected",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  offline: {
    label: "Disconnected",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
  },
  connecting: {
    label: "Connecting",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
  reconnecting: {
    label: "Reconnecting",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
} as const;

interface ConnectionStatusProps extends React.ComponentProps<"span"> {
  status?: keyof typeof statuses;
  /** Overrides the default status label. */
  label?: string;
}

function ConnectionStatus({
  status = "online",
  label,
  className,
  ...props
}: ConnectionStatusProps) {
  const { label: defaultLabel, dot, text } = statuses[status];
  const isPending = status === "connecting" || status === "reconnecting";

  return (
    <span
      data-slot="connection-status"
      data-status={status}
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-1.5 text-xs", text, className)}
      {...props}
    >
      <span aria-hidden className="relative flex size-2">
        {isPending ? (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              dot,
            )}
          />
        ) : null}
        <span className={cn("relative inline-flex size-2 rounded-full", dot)} />
      </span>
      {label ?? defaultLabel}
    </span>
  );
}

export { ConnectionStatus };
export type { ConnectionStatusProps };
