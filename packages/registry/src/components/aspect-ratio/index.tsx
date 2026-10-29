import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface AspectRatioProps extends React.ComponentProps<"div"> {
  /** Width divided by height. Defaults to 16 / 9. */
  ratio?: number;
}

function AspectRatio({
  className,
  ratio = 16 / 9,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ aspectRatio: String(ratio), ...style }}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    />
  );
}

export { AspectRatio };
