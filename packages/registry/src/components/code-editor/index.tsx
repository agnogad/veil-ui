"use client";

import { useRef, useState } from "react";

import { cn } from "@veil-ui/utils";

interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Accessible name for the editor. */
  label?: string;
  language?: string;
  showLineNumbers?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
}

function CodeEditor({
  value,
  defaultValue = "",
  onValueChange,
  label = "Code editor",
  language = "plaintext",
  showLineNumbers = true,
  disabled = false,
  readOnly = false,
  rows = 10,
  className,
}: CodeEditorProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const isControlled = value !== undefined;
  const gutterRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const lines = current.split("\n");
  const lineCount = Math.max(lines.length, 1);

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <div
      data-slot="code-editor"
      className={cn(
        "overflow-hidden rounded-lg border bg-muted/30 font-mono text-sm",
        disabled && "opacity-60",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
        <span className="font-medium">{language}</span>
        <span className="tabular-nums">
          {lineCount} line{lineCount === 1 ? "" : "s"} · {current.length} chars
        </span>
      </div>
      <div className="flex max-h-96">
        {showLineNumbers && (
          <div
            ref={gutterRef}
            aria-hidden
            className="shrink-0 select-none overflow-hidden border-r bg-muted/40 px-3 py-3 text-right leading-6 text-muted-foreground/70"
          >
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        )}
        <textarea
          ref={areaRef}
          value={current}
          rows={rows}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          wrap="off"
          disabled={disabled}
          readOnly={readOnly}
          aria-label={label}
          onChange={(event) => commit(event.target.value)}
          onScroll={(event) => {
            if (gutterRef.current) {
              gutterRef.current.scrollTop = event.currentTarget.scrollTop;
            }
          }}
          onKeyDown={(event) => {
            if (event.key !== "Tab" || readOnly || disabled) return;
            event.preventDefault();
            const area = event.currentTarget;
            const start = area.selectionStart;
            const end = area.selectionEnd;
            const next = `${current.slice(0, start)}  ${current.slice(end)}`;
            commit(next);
            requestAnimationFrame(() => {
              area.selectionStart = start + 2;
              area.selectionEnd = start + 2;
            });
          }}
          className="min-h-40 w-full resize-y bg-transparent px-3 py-3 leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export { CodeEditor };
