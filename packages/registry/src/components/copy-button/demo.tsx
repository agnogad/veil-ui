"use client";

import { CopyButton } from "./index";

export function CopyButtonBasic() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-2 rounded-md border px-3 py-2">
      <code className="text-sm">npx veil-ui@latest add button</code>
      <CopyButton value="npx veil-ui@latest add button" />
    </div>
  );
}

export function CopyButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <CopyButton size="sm" value="veil-ui" />
      <CopyButton size="default" value="veil-ui" />
      <CopyButton size="lg" value="veil-ui" />
    </div>
  );
}

export function CopyButtonGhost() {
  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-2">
      <span className="text-sm text-muted-foreground">API key</span>
      <code className="text-sm">sk_live_51H8</code>
      <CopyButton
        variant="ghost"
        size="sm"
        value="sk_live_51H8"
        label="Copy API key"
        copiedLabel="API key copied"
      />
    </div>
  );
}
