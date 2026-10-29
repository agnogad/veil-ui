import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface SearchResultCardProps extends Omit<React.ComponentProps<"article">, "title"> {
  title: React.ReactNode;
  url: string;
  snippet: React.ReactNode;
  breadcrumb?: string;
  href?: string;
  meta?: React.ReactNode;
}

function SearchResultCard({
  className,
  title,
  url,
  snippet,
  breadcrumb,
  href = "#",
  meta,
  ...props
}: SearchResultCardProps) {
  return (
    <article
      data-slot="search-result-card"
      className={cn("group max-w-2xl space-y-1", className)}
      {...props}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {breadcrumb ? <span>{breadcrumb}</span> : null}
        <span className="truncate">{url}</span>
      </div>
      <h3 className="text-base font-medium">
        <a
          href={href}
          className="text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          {title}
        </a>
      </h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{snippet}</p>
      {meta ? <div className="text-xs text-muted-foreground">{meta}</div> : null}
    </article>
  );
}

export { SearchResultCard };
