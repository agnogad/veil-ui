"use client";

import { cn } from "@veil-ui/utils";
import { useState } from "react";

import { CopyButton } from "./copy-button";

export interface FrameworkSourceFile {
  name: string;
  content: string;
}

type Framework = "vue" | "html";

interface FrameworkSourceTabsProps {
  vue?: FrameworkSourceFile[];
  html?: FrameworkSourceFile[];
}

const LABELS: Record<Framework, string> = {
  vue: "Vue",
  html: "HTML",
};

export function FrameworkSourceTabs({ vue, html }: FrameworkSourceTabsProps) {
  const available: Framework[] = [
    ...(vue ? (["vue"] as const) : []),
    ...(html ? (["html"] as const) : []),
  ];
  const [framework, setFramework] = useState<Framework>(available[0] ?? "vue");
  const [fileIndex, setFileIndex] = useState(0);

  const files = (framework === "vue" ? vue : html) ?? [];
  const file = files[Math.min(fileIndex, Math.max(files.length - 1, 0))];

  function select(next: Framework) {
    setFramework(next);
    setFileIndex(0);
  }

  if (!file) return null;

  return (
    <div className="not-prose mt-6 overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-2 py-1.5">
        <div role="tablist" aria-label="Framework" className="flex gap-1">
          {available.map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={framework === value}
              onClick={() => select(value)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                framework === value
                  ? "bg-background text-foreground shadow-xs ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {LABELS[value]}
            </button>
          ))}
        </div>
        <CopyButton value={file.content} label="Copy framework source" />
      </div>

      {files.length > 1 ? (
        <div className="flex flex-wrap gap-1 border-b px-2 py-1.5">
          {files.map((entry, index) => (
            <button
              key={entry.name}
              type="button"
              onClick={() => setFileIndex(index)}
              className={cn(
                "rounded px-2 py-0.5 font-mono text-[11px] transition-colors",
                index === fileIndex
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.name}
            </button>
          ))}
        </div>
      ) : null}

      <pre className="max-h-[32rem] overflow-auto bg-muted/20 p-4 text-xs leading-relaxed">
        <code>{file.content}</code>
      </pre>

      {framework === "html" ? (
        <p className="border-t bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
          Plain HTML variants assume Tailwind CSS v4 and the Veil UI tokens.
          Load any matching <code>.js</code> file with a script tag.
        </p>
      ) : null}
    </div>
  );
}
