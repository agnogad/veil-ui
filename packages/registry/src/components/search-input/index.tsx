"use client";

import { Search, X } from "lucide-react";
import { useState, type ComponentProps } from "react";

import { cn } from "@veil-ui/utils";

import { Input } from "../input/index";

interface SearchInputProps extends Omit<ComponentProps<"input">, "type"> {
  onClear?: () => void;
  containerClassName?: string;
}

function SearchInput({
  className,
  containerClassName,
  value,
  defaultValue,
  onChange,
  onClear,
  ...props
}: SearchInputProps) {
  const [uncontrolled, setUncontrolled] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const current = isControlled ? String(value) : uncontrolled;

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        value={current}
        onChange={(event) => {
          if (!isControlled) setUncontrolled(event.target.value);
          onChange?.(event);
        }}
        className={cn(
          "pl-9 pr-9 [&::-webkit-search-cancel-button]:appearance-none",
          className,
        )}
        {...props}
      />
      {current ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            if (!isControlled) setUncontrolled("");
            onClear?.();
          }}
          className="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

export { SearchInput };
