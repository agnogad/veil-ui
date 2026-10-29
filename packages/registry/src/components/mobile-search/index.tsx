"use client";

import { Clock, Search, X } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobileSearchProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  placeholder?: string;
  suggestions?: string[];
  defaultValue?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

function MobileSearch({
  className,
  placeholder = "Search",
  suggestions = [],
  defaultValue = "",
  onSearch,
  onClear,
  ...props
}: MobileSearchProps) {
  const [query, setQuery] = useState(defaultValue);

  return (
    <div
      data-slot="mobile-search"
      className={cn("w-full max-w-sm", className)}
      {...props}
    >
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch?.(query);
        }}
        className="flex items-center gap-2 rounded-full border bg-muted/40 px-3 focus-within:ring-[3px] focus-within:ring-ring/30"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(event) => setQuery(event.target.value)}
          className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              onClear?.();
            }}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : null}
      </form>
      {suggestions.length > 0 ? (
        <ul className="mt-3 grid gap-1" aria-label="Recent searches">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => {
                  setQuery(suggestion);
                  onSearch?.(suggestion);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Clock className="size-3.5" aria-hidden />
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { MobileSearch };
export type { MobileSearchProps };
