"use client";

import { X } from "lucide-react";
import { useId, useRef, useState } from "react";

import { cn } from "@veil-ui/utils";

interface TagsInputProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  placeholder?: string;
  /** Accessible name for the input. */
  label?: string;
  disabled?: boolean;
  maxTags?: number;
  allowDuplicates?: boolean;
  id?: string;
  className?: string;
}

function TagsInput({
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Add a tag",
  label = "Add tag",
  disabled = false,
  maxTags,
  allowDuplicates = false,
  id,
  className,
}: TagsInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");
  const tags = value ?? internal;
  const isControlled = value !== undefined;

  function update(next: string[]) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  function addTags(raw: string[]) {
    const next = [...tags];
    for (const item of raw) {
      const tag = item.trim();
      if (!tag) continue;
      if (maxTags !== undefined && next.length >= maxTags) break;
      if (!allowDuplicates && next.includes(tag)) continue;
      next.push(tag);
    }
    if (next.length !== tags.length) update(next);
    setDraft("");
  }

  function removeTag(tag: string) {
    update(tags.filter((item) => item !== tag));
    inputRef.current?.focus();
  }

  return (
    <div
      data-slot="tags-input"
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove tag ${tag}`}
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              removeTag(tag);
            }}
            className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
          >
            <X className="size-3" aria-hidden />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        value={draft}
        disabled={disabled}
        aria-label={label}
        placeholder={tags.length === 0 ? placeholder : undefined}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => {
          if (draft.trim()) addTags([draft]);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTags([draft]);
          } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
            event.preventDefault();
            update(tags.slice(0, -1));
          }
        }}
        onPaste={(event) => {
          const text = event.clipboardData.getData("text");
          if (!/[,;\n]/.test(text)) return;
          event.preventDefault();
          addTags(text.split(/[,;\n]/));
        }}
        className="h-6 min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

export { TagsInput };
