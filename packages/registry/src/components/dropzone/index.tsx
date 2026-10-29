"use client";

import { CloudUpload } from "lucide-react";
import { useId, useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface DropzoneProps
  extends Omit<React.ComponentProps<"div">, "onDrop" | "onDragOver" | "onChange"> {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
  /** Icon shown above the title. */
  icon?: React.ElementType;
}

function Dropzone({
  className,
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  title = "Drag and drop files here",
  description,
  icon: Icon = CloudUpload,
  ...props
}: DropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  }

  function openPicker() {
    if (!disabled) inputRef.current?.click();
  }

  return (
    <div {...props} data-slot="dropzone">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-label={title}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-10 text-center outline-none transition-colors hover:border-muted-foreground/50 hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          dragging && "border-primary bg-primary/5",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
      >
        <Icon className="size-8 text-muted-foreground" aria-hidden />
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <span className="text-sm font-medium text-primary underline underline-offset-4">
          Browse files
        </span>
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </div>
  );
}

export { Dropzone };
