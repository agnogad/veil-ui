"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@veil-ui/utils";

interface CodeBlockProps extends React.ComponentProps<"figure"> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  copyable = true,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the code stays selectable.
    }
  }

  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <figure
      data-slot="code-block"
      className={cn(
        "overflow-hidden rounded-lg border bg-muted/40",
        className,
      )}
      {...props}
    >
      {(filename || language || copyable) && (
        <figcaption className="flex items-center justify-between gap-3 border-b px-3 py-1.5">
          <span className="truncate font-mono text-xs text-muted-foreground">
            {filename ?? language ?? "code"}
          </span>
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy code"}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden />
              ) : (
                <Copy className="size-3.5" aria-hidden />
              )}
            </button>
          )}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono">
          {showLineNumbers ? (
            <span className="grid">
              {lines.map((line, index) => (
                <span key={index} className="grid grid-cols-[auto_1fr] gap-4">
                  <span
                    aria-hidden
                    className="select-none text-right text-muted-foreground/60"
                  >
                    {index + 1}
                  </span>
                  <span>{line || " "}</span>
                </span>
              ))}
            </span>
          ) : (
            code
          )}
        </code>
      </pre>
    </figure>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
