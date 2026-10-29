import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const tones = {
  default: "",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
} as const;

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label" | "strong" | "em";
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
  tone?: keyof typeof tones;
  truncate?: boolean;
}

function Text({
  as: Comp = "p",
  size = "base",
  weight = "normal",
  tone = "default",
  truncate = false,
  className,
  ...props
}: TextProps) {
  return (
    <Comp
      data-slot="text"
      className={cn(
        sizes[size],
        weights[weight],
        tones[tone],
        truncate && "truncate",
        className,
      )}
      {...props}
    />
  );
}

export { Text };
export type { TextProps };
