"use client";

import { useState } from "react";

import { SearchInput } from "./index";

export function SearchInputBasic() {
  return (
    <SearchInput
      placeholder="Search components..."
      aria-label="Search components"
      className="max-w-sm"
    />
  );
}

export function SearchInputWithValue() {
  return (
    <SearchInput
      defaultValue="dialog"
      aria-label="Search components"
      className="max-w-sm"
    />
  );
}

export function SearchInputControlled() {
  const [query, setQuery] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-2">
      <SearchInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onClear={() => setQuery("")}
        placeholder="Filter projects"
        aria-label="Filter projects"
      />
      <p className="text-xs text-muted-foreground">
        {query ? `Searching for “${query}”` : "No filter applied"}
      </p>
    </div>
  );
}
