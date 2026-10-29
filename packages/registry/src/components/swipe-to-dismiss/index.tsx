"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface SwipeToDismissProps
  extends Omit<React.ComponentProps<"div">, "onDismiss"> {
  onDismiss?: () => void;
  /** Horizontal distance in pixels required to dismiss. */
  threshold?: number;
  dismissLabel?: string;
}

function SwipeToDismiss({
  className,
  children,
  onDismiss,
  threshold = 96,
  dismissLabel = "Dismiss",
  ...props
}: SwipeToDismissProps) {
  const [offset, setOffset] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  return (
    <div
      data-slot="swipe-to-dismiss"
      className={cn(
        "relative rounded-lg border bg-background transition-opacity",
        className,
      )}
      style={{ opacity: 1 - Math.min(Math.abs(offset) / (threshold * 2), 0.7) }}
      {...props}
    >
      <div
        onPointerDown={(event) => {
          dragging.current = true;
          startX.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          setOffset(event.clientX - startX.current);
        }}
        onPointerUp={() => {
          if (!dragging.current) return;
          dragging.current = false;
          if (Math.abs(offset) >= threshold) {
            onDismiss?.();
          }
          setOffset(0);
        }}
        onPointerCancel={() => {
          dragging.current = false;
          setOffset(0);
        }}
        className="transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `translateX(${offset}px)`, touchAction: "pan-y" }}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={dismissLabel}
        onClick={onDismiss}
        className="absolute right-2 top-2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export { SwipeToDismiss };
export type { SwipeToDismissProps };
