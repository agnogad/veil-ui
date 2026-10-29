"use client";

import { useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface SwipeableAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

interface SwipeableRowProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  actions: SwipeableAction[];
  /** Width in pixels reserved for each revealed action. */
  actionWidth?: number;
}

function SwipeableRow({
  className,
  children,
  actions,
  actionWidth = 72,
  ...props
}: SwipeableRowProps) {
  const [offset, setOffset] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const baseOffset = useRef(0);
  const total = actions.length * actionWidth;

  const clamp = (value: number) => Math.min(0, Math.max(-total, value));

  return (
    <div
      data-slot="swipeable-row"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div className="absolute inset-y-0 right-0 flex">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            style={{ width: actionWidth }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs font-medium text-primary-foreground [&_svg]:size-4",
              action.destructive ? "bg-destructive" : "bg-primary",
            )}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
      <div
        onPointerDown={(event) => {
          dragging.current = true;
          startX.current = event.clientX;
          baseOffset.current = offset;
        }}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          setOffset(
            clamp(baseOffset.current + (event.clientX - startX.current)),
          );
        }}
        onPointerUp={() => {
          if (!dragging.current) return;
          dragging.current = false;
          setOffset((current) => (current < -total / 3 ? -total : 0));
        }}
        onPointerLeave={() => {
          if (!dragging.current) return;
          dragging.current = false;
          setOffset((current) => (current < -total / 3 ? -total : 0));
        }}
        onPointerCancel={() => {
          dragging.current = false;
          setOffset(0);
        }}
        className="relative z-10 bg-background transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `translateX(${offset}px)`, touchAction: "pan-y" }}
      >
        {children}
      </div>
    </div>
  );
}

export { SwipeableRow };
export type { SwipeableAction, SwipeableRowProps };
