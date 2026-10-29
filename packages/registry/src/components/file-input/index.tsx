"use client";

import { FileText, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

interface FileInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  /** Visible label rendered above the field. */
  label?: string;
  hint?: string;
  error?: string;
  onFilesChange?: (files: FileList | null) => void;
}

function FileInput({
  className,
  label,
  hint,
  error,
  onFilesChange,
  id,
  disabled,
  ...props
}: FileInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [names, setNames] = useState<string[]>([]);

  const descriptionId = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div data-slot="file-input" className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium leading-none">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        onChange={(event) => {
          const list = event.target.files;
          setNames(list ? Array.from(list).map((file) => file.name) : []);
          onFilesChange?.(list);
        }}
        className="block w-full cursor-pointer rounded-md border border-input bg-transparent text-sm text-muted-foreground shadow-xs outline-none transition-colors file:mr-3 file:h-9 file:border-0 file:border-r file:border-solid file:border-input file:bg-secondary file:px-3 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-secondary/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        {...props}
      />
      {names.length > 0 && (
        <ul className="flex flex-col gap-1">
          {names.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <FileText className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{name}</span>
            </li>
          ))}
        </ul>
      )}
      {names.length > 0 && !disabled && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = "";
            setNames([]);
            onFilesChange?.(null);
          }}
        >
          <X aria-hidden />
          Clear selection
        </Button>
      )}
      {error ? (
        <p id={descriptionId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export { FileInput };
