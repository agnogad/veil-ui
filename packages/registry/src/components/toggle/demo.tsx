"use client";

import { Bookmark, Italic, Underline } from "lucide-react";

import { Toggle } from "./index";

export function ToggleBasic() {
  return (
    <Toggle aria-label="Bookmark this page">
      <Bookmark />
    </Toggle>
  );
}

export function ToggleOutline() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  );
}

export function ToggleSizes() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bookmark">
        <Bookmark />
      </Toggle>
      <Toggle aria-label="Bookmark">
        <Bookmark />
      </Toggle>
      <Toggle size="lg" aria-label="Bookmark">
        <Bookmark />
      </Toggle>
    </div>
  );
}

export function ToggleWithText() {
  return (
    <Toggle variant="outline">
      <Bookmark /> Save
    </Toggle>
  );
}
