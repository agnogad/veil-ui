"use client";

import { cn } from "@veil-ui/utils";

import { CopyButton } from "./copy-button";

interface InstallCommandProps {
  command?: string;
  className?: string;
}

export function InstallCommand({
  command = "npx veil-ui@latest add button",
  className,
}: InstallCommandProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border bg-muted/40 py-2 pl-4 pr-2 font-mono text-sm",
        className,
      )}
    >
      <code className="truncate">
        <span className="select-none text-muted-foreground">$ </span>
        {command}
      </code>
      <CopyButton value={command} label="Copy install command" />
    </div>
  );
}
