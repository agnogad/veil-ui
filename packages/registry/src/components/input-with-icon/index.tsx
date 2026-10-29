import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Input } from "../input/index";

interface InputWithIconProps extends React.ComponentProps<"input"> {
  icon: React.ElementType;
  position?: "left" | "right";
}

function InputWithIcon({
  icon: Icon,
  position = "left",
  className,
  ...props
}: InputWithIconProps) {
  return (
    <div data-slot="input-with-icon" className="relative w-full">
      <Icon
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
          position === "left" ? "left-3" : "right-3",
        )}
      />
      <Input
        className={cn(
          position === "left" ? "pl-9" : "pr-9",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { InputWithIcon };
export type { InputWithIconProps };
