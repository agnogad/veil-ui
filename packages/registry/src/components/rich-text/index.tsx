"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const commands = [
  { command: "bold", label: "Bold", Icon: Bold },
  { command: "italic", label: "Italic", Icon: Italic },
  { command: "underline", label: "Underline", Icon: Underline },
] as const;

const allowedTags = new Set([
  "P", "BR", "DIV", "SPAN", "STRONG", "B", "EM", "I", "U", "S",
  "UL", "OL", "LI", "A", "BLOCKQUOTE", "CODE", "PRE", "H1", "H2",
  "H3", "H4", "H5", "H6",
]);
const blockedTags = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED"]);
const allowedAttributes = new Set(["href", "target", "rel"]);

/** defaultValue is HTML: parse it inertly and keep only whitelisted markup. */
function sanitizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  for (const element of Array.from(doc.body.querySelectorAll("*"))) {
    if (blockedTags.has(element.tagName)) {
      element.remove();
      continue;
    }
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }
    for (const attribute of Array.from(element.attributes)) {
      if (!allowedAttributes.has(attribute.name)) {
        element.removeAttribute(attribute.name);
      }
    }
    if (
      element.tagName === "A" &&
      /^\s*javascript:/i.test(element.getAttribute("href") ?? "")
    ) {
      element.removeAttribute("href");
    }
  }

  return doc.body.innerHTML;
}

interface RichTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function RichText({
  defaultValue = "",
  onChange,
  placeholder = "Write something…",
  disabled = false,
  className,
  ...props
}: RichTextProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialValue = useRef(defaultValue);
  const [isEmpty, setIsEmpty] = useState(
    defaultValue.replace(/<[^>]*>/g, "").trim().length === 0,
  );

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sanitizeHtml(initialValue.current);
    }
  }, []);

  function syncValue() {
    const editor = editorRef.current;
    if (!editor) return;
    setIsEmpty((editor.textContent ?? "").trim().length === 0);
    onChange?.(editor.innerHTML);
  }

  function applyCommand(command: "bold" | "italic" | "underline") {
    editorRef.current?.focus();
    document.execCommand(command);
    syncValue();
  }

  return (
    <div
      data-slot="rich-text"
      className={cn(
        "overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring",
        disabled && "opacity-60",
        className,
      )}
      {...props}
    >
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex items-center gap-1 border-b p-1"
      >
        {commands.map(({ command, label, Icon }) => (
          <button
            key={command}
            type="button"
            aria-label={label}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => applyCommand(command)}
            className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <Icon className="size-4" aria-hidden />
          </button>
        ))}
      </div>
      <div className="relative">
        {isEmpty ? (
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-2 text-sm text-muted-foreground"
          >
            {placeholder}
          </span>
        ) : null}
        <div
          ref={editorRef}
          role="textbox"
          aria-label="Rich text editor"
          aria-multiline="true"
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={syncValue}
          className="min-h-24 px-3 py-2 text-sm leading-relaxed outline-none"
        />
      </div>
    </div>
  );
}

export { RichText };
export type { RichTextProps };
