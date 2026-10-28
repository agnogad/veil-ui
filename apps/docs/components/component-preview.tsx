"use client";

import { cn } from "@veil-ui/utils";
import { useState } from "react";

import { CopyButton } from "./copy-button";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
  className?: string;
  align?: "start" | "center" | "end";
  /** Extra classes applied to the preview surface. */
  previewClassName?: string;
}

export function ComponentPreview({
  children,
  code,
  className,
  align = "center",
  previewClassName,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-lg border bg-background",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-2 py-1.5">
        <div role="tablist" aria-label="Preview or code" className="flex gap-1">
          {(["preview", "code"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                tab === value
                  ? "bg-background text-foreground shadow-xs ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {value}
            </button>
          ))}
        </div>
        {code ? <CopyButton value={code} label="Copy example code" /> : null}
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "flex min-h-40 flex-wrap gap-3 p-6",
            align === "center" && "items-center justify-center",
            align === "start" && "items-start justify-start",
            align === "end" && "items-end justify-end",
            previewClassName,
          )}
        >
          {children}
        </div>
      ) : (
        <pre className="max-h-[28rem] overflow-auto bg-muted/20 p-4 text-xs leading-relaxed">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
