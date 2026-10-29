import type * as React from "react";

import { cn } from "@veil-ui/utils";

const positions = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
} as const;

const sizes = {
  default: "size-12",
  lg: "size-14",
} as const;

interface FabProps extends React.ComponentProps<"button"> {
  /** Corner of the viewport where the button floats. */
  position?: keyof typeof positions;
  /** Icon-only size. Ignored when a label is provided. */
  size?: keyof typeof sizes;
  /** Optional visible label, turning the button into an extended FAB. */
  label?: React.ReactNode;
}

function Fab({
  className,
  position = "bottom-right",
  size = "default",
  label,
  children,
  type = "button",
  ...props
}: FabProps) {
  return (
    <button
      data-slot="fab"
      data-position={position}
      type={type}
      className={cn(
        "fixed z-50 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg outline-none transition-[color,background-color,box-shadow] hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
        positions[position],
        label ? "h-12 px-5 text-sm font-medium" : sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {label ? <span>{label}</span> : null}
    </button>
  );
}

export { Fab };
