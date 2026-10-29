import type * as React from "react";

import { cn } from "@veil-ui/utils";

const columns = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-5",
  6: "grid-cols-3 sm:grid-cols-6",
} as const;

interface LogoCloudItem {
  name: string;
  src?: string;
  href?: string;
}

interface LogoCloudProps extends React.ComponentProps<"ul"> {
  items: LogoCloudItem[];
  columns?: keyof typeof columns;
}

function LogoCloud({
  items,
  columns: columnCount = 4,
  className,
  ...props
}: LogoCloudProps) {
  return (
    <ul
      data-slot="logo-cloud"
      className={cn(
        "grid list-none items-center justify-items-center gap-6",
        columns[columnCount],
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const content = item.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.name}
            className="h-8 w-auto opacity-60 grayscale transition-opacity hover:opacity-100"
          />
        ) : (
          <span className="text-sm font-semibold text-muted-foreground">
            {item.name}
          </span>
        );

        return (
          <li key={item.name} data-slot="logo-cloud-item">
            {item.href ? (
              <a
                href={item.href}
                className="rounded-sm opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}

export { LogoCloud };
export type { LogoCloudItem, LogoCloudProps };
