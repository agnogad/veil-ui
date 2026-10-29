"use client";

import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface TocItem {
  id: string;
  title: string;
  level?: 2 | 3 | 4;
}

interface TableOfContentsProps extends React.ComponentProps<"nav"> {
  items: TocItem[];
  activeId?: string;
  label?: string;
  onNavigate?: (id: string) => void;
}

function TableOfContents({
  items,
  activeId,
  label = "On this page",
  onNavigate,
  className,
  ...props
}: TableOfContentsProps) {
  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    onNavigate?.(id);
  }

  return (
    <nav
      data-slot="table-of-contents"
      aria-label={label}
      className={cn("text-sm", className)}
      {...props}
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <ul className="grid gap-0.5 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              onClick={(event) => handleClick(event, item.id)}
              className={cn(
                "-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
                item.level === 3 && "pl-6",
                item.level === 4 && "pl-9",
                activeId === item.id &&
                  "border-foreground font-medium text-foreground",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { TableOfContents };
export type { TocItem, TableOfContentsProps };
