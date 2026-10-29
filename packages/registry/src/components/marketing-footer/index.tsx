import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MarketingFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface MarketingFooterProps extends React.ComponentProps<"footer"> {
  brand?: React.ReactNode;
  description?: React.ReactNode;
  columns?: MarketingFooterColumn[];
  social?: { label: string; href: string; icon?: React.ReactNode }[];
  legal?: React.ReactNode;
}

function MarketingFooter({
  className,
  brand = "Veil UI",
  description,
  columns = [],
  social = [],
  legal,
  ...props
}: MarketingFooterProps) {
  return (
    <footer
      data-slot="marketing-footer"
      className={cn("border-t bg-muted/20 px-6 py-12", className)}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="text-base font-semibold tracking-tight">{brand}</p>
          {description ? (
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
          {social.length > 0 ? (
            <ul className="mt-4 flex items-center gap-2" aria-label="Social links">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
                  >
                    {item.icon ?? item.label.slice(0, 1)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {column.title}
            </p>
            <ul className="mt-3 grid gap-2 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      {legal ? (
        <div className="mx-auto mt-10 w-full max-w-6xl border-t pt-6 text-xs text-muted-foreground">
          {legal}
        </div>
      ) : null}
    </footer>
  );
}

export { MarketingFooter };
export type { MarketingFooterColumn, MarketingFooterProps };
