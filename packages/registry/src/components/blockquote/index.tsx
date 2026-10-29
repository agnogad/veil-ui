import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface BlockquoteProps extends React.ComponentProps<"blockquote"> {
  cite?: string;
}

function Blockquote({
  cite,
  className,
  children,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote
      data-slot="blockquote"
      cite={cite}
      className={cn(
        "border-l-2 pl-4 text-sm italic text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {cite ? (
        <footer className="mt-2 text-xs not-italic">
          <span aria-hidden>— </span>
          <cite>{cite}</cite>
        </footer>
      ) : null}
    </blockquote>
  );
}

export { Blockquote };
export type { BlockquoteProps };
