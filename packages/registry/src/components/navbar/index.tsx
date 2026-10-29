import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface NavbarProps extends React.ComponentProps<"header"> {
  sticky?: boolean;
  bordered?: boolean;
}

function Navbar({
  sticky = false,
  bordered = true,
  className,
  ...props
}: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className={cn(
        "mx-auto flex h-14 w-full max-w-7xl items-center gap-4 bg-background/95 px-4 backdrop-blur sm:px-6",
        bordered && "border-b",
        sticky && "sticky top-0 z-40",
        className,
      )}
      {...props}
    />
  );
}

export { Navbar };
export type { NavbarProps };
