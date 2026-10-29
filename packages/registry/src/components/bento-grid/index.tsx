import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface BentoGridItem {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  media?: React.ReactNode;
  className?: string;
}

interface BentoGridProps extends React.ComponentProps<"div"> {
  items: BentoGridItem[];
}

function BentoGrid({ className, items, ...props }: BentoGridProps) {
  return (
    <div
      data-slot="bento-grid"
      className={cn("grid auto-rows-min gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "flex flex-col gap-3 rounded-xl border bg-background p-5 shadow-xs",
            index === 0 && "sm:col-span-2 sm:row-span-2",
            item.className,
          )}
        >
          {item.icon ? (
            <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4">
              {item.icon}
            </span>
          ) : null}
          <div>
            <h3 className="text-sm font-semibold">{item.title}</h3>
            {item.description ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>
          {item.media ? <div className="mt-auto">{item.media}</div> : null}
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
export type { BentoGridItem, BentoGridProps };
