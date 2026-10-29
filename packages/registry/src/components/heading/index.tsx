import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
} as const;

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

type Level = keyof typeof sizes;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  /** Visual size; defaults to the level. */
  size?: Level;
  weight?: keyof typeof weights;
  tone?: "default" | "muted";
}

function Heading({
  level = 2,
  size,
  weight = "semibold",
  tone = "default",
  className,
  ...props
}: HeadingProps) {
  const Comp = `h${level}` as "h1";

  return (
    <Comp
      data-slot="heading"
      data-level={level}
      className={cn(
        "text-balance tracking-tight",
        sizes[size ?? level],
        weights[weight],
        tone === "muted" && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Heading };
export type { HeadingProps };
