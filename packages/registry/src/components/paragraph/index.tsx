import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
} as const;

interface ParagraphProps extends React.ComponentProps<"p"> {
  size?: keyof typeof sizes;
  tone?: "default" | "muted";
}

function Paragraph({
  size = "base",
  tone = "default",
  className,
  ...props
}: ParagraphProps) {
  return (
    <p
      data-slot="paragraph"
      className={cn(
        sizes[size],
        "leading-relaxed text-pretty",
        tone === "muted" && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Paragraph };
export type { ParagraphProps };
