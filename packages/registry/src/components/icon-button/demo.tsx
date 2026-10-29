"use client";

import { Bell, MoreHorizontal, Plus, Settings, Trash2 } from "lucide-react";

import { IconButton } from "./index";

export function IconButtonBasic() {
  return (
    <IconButton aria-label="Add item">
      <Plus />
    </IconButton>
  );
}

export function IconButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IconButton aria-label="Notifications">
        <Bell />
      </IconButton>
      <IconButton variant="secondary" aria-label="Settings">
        <Settings />
      </IconButton>
      <IconButton variant="outline" aria-label="More options">
        <MoreHorizontal />
      </IconButton>
      <IconButton variant="ghost" aria-label="More options">
        <MoreHorizontal />
      </IconButton>
      <IconButton variant="destructive" aria-label="Delete">
        <Trash2 />
      </IconButton>
    </div>
  );
}

export function IconButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IconButton size="sm" aria-label="Add">
        <Plus />
      </IconButton>
      <IconButton aria-label="Add">
        <Plus />
      </IconButton>
      <IconButton size="lg" aria-label="Add">
        <Plus />
      </IconButton>
    </div>
  );
}

export function IconButtonAsChild() {
  return (
    <IconButton asChild variant="outline" aria-label="Open settings">
      <a href="/docs/theming">
        <Settings />
      </a>
    </IconButton>
  );
}
