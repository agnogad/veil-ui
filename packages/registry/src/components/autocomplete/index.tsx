"use client";

import { useId, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "role"
  > {
  options: AutocompleteOption[];
  /** Selected option value. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option?: AutocompleteOption) => void;
  emptyMessage?: string;
}

function Autocomplete({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Type to search…",
  emptyMessage = "No matches found.",
  className,
  disabled,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: AutocompleteProps) {
  const listId = useId();
  const initial = options.find((option) => option.value === (value ?? defaultValue));
  const [query, setQuery] = useState(initial?.label ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  );

  function select(option: AutocompleteOption) {
    setQuery(option.label);
    setOpen(false);
    setActiveIndex(-1);
    onValueChange?.(option.value, option);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setOpen(true);
    setActiveIndex(-1);
    if (event.target.value === "") onValueChange?.("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        Math.min(index + 1, filtered.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      const option = filtered[activeIndex];
      if (option) select(option);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div data-slot="autocomplete" className="relative w-full">
      <input
        {...props}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
        }
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={(event) => {
          setOpen(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setOpen(false);
          onBlur?.(event);
        }}
        onKeyDown={handleKeyDown}
        data-slot="autocomplete-input"
        className={cn(
          "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color]",
          "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          data-slot="autocomplete-list"
          className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {filtered.length === 0 ? (
            <li className="px-2 py-3 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={activeIndex === index}
                onMouseDown={(event) => {
                  event.preventDefault();
                  select(option);
                }}
                className={cn(
                  "cursor-pointer rounded-sm px-2 py-1.5 text-sm",
                  activeIndex === index &&
                    "bg-accent text-accent-foreground",
                )}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

export { Autocomplete };
export type { AutocompleteOption, AutocompleteProps };
