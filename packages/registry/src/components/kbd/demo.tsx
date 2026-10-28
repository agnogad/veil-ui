"use client";

import { Search } from "lucide-react";

import { Kbd } from "./index";

export function KbdBasic() {
  return (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  );
}

export function KbdShortcut() {
  return (
    <p className="text-sm text-muted-foreground">
      Press <Kbd>Shift</Kbd> + <Kbd>?</Kbd> to open the shortcut menu.
    </p>
  );
}

export function KbdInMenu() {
  return (
    <div className="flex w-full max-w-xs items-center justify-between rounded-md border px-3 py-2 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Search className="size-4" aria-hidden /> Search
      </span>
      <span className="flex items-center gap-0.5">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </div>
  );
}
