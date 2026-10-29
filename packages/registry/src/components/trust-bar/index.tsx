import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { LogoCloud, type LogoCloudItem } from "../logo-cloud/index";

interface TrustBarProps extends React.ComponentProps<"div"> {
  label?: React.ReactNode;
  items: LogoCloudItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
}

function TrustBar({
  className,
  label = "Trusted by teams at",
  items,
  columns = 4,
  ...props
}: TrustBarProps) {
  return (
    <div
      data-slot="trust-bar"
      className={cn(
        "flex flex-col items-center gap-6 border-y bg-muted/20 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <LogoCloud items={items} columns={columns} className="w-full max-w-4xl" />
    </div>
  );
}

export { TrustBar };
export type { TrustBarProps };
