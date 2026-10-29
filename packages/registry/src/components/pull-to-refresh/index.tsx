"use client";

import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface PullToRefreshProps extends Omit<React.ComponentProps<"div">, "onScroll"> {
  onRefresh: () => Promise<void> | void;
  /** Pull distance in pixels required to trigger a refresh. */
  threshold?: number;
  refreshingLabel?: string;
}

function PullToRefresh({
  className,
  children,
  onRefresh,
  threshold = 64,
  refreshingLabel = "Refreshing…",
  ...props
}: PullToRefreshProps) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);

  const trigger = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
      setPull(0);
    }
  };

  const ready = pull >= threshold;

  return (
    <div
      data-slot="pull-to-refresh"
      className={cn("relative overflow-hidden rounded-lg border", className)}
      {...props}
    >
      <div
        aria-live="polite"
        className="absolute inset-x-0 top-0 flex items-center justify-center overflow-hidden text-xs text-muted-foreground"
        style={{ height: refreshing ? 40 : pull }}
      >
        {refreshing || pull > 0 ? (
          <span className="flex items-center gap-2">
            <Loader2
              className={cn("size-3.5", refreshing && "animate-spin")}
              aria-hidden
            />
            {refreshing ? refreshingLabel : ready ? "Release to refresh" : "Pull to refresh"}
          </span>
        ) : null}
      </div>
      <div
        onTouchStart={(event) => {
          if (event.currentTarget.scrollTop <= 0) {
            startY.current = event.touches[0]?.clientY ?? null;
          }
        }}
        onTouchMove={(event) => {
          if (startY.current === null) return;
          const delta = (event.touches[0]?.clientY ?? 0) - startY.current;
          if (delta > 0) {
            setPull(Math.min(delta * 0.5, 96));
          }
        }}
        onTouchEnd={() => {
          startY.current = null;
          if (ready) {
            void trigger();
          } else {
            setPull(0);
          }
        }}
        className="max-h-64 overflow-y-auto"
        style={{ transform: `translateY(${refreshing ? 8 : 0}px)` }}
      >
        <div className="flex justify-end border-b px-3 py-2">
          <button
            type="button"
            className="sr-only"
            onClick={() => void trigger()}
          >
            Refresh
          </button>
          <span className="text-[11px] text-muted-foreground">
            Pull down to refresh
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export { PullToRefresh };
export type { PullToRefreshProps };
