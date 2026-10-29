import type * as React from "react";

import { cn } from "@veil-ui/utils";

const clamps = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
} as const;

interface TruncatedTextProps extends React.ComponentProps<"p"> {
  lines?: keyof typeof clamps;
}

function TruncatedText({
  lines = 2,
  className,
  ...props
}: TruncatedTextProps) {
  return (
    <p
      data-slot="truncated-text"
      data-lines={lines}
      className={cn(clamps[lines], className)}
      {...props}
    />
  );
}

export { TruncatedText };
export type { TruncatedTextProps };
