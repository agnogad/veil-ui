"use client";

import { ThemeToggle } from "./index";

export function ThemeToggleBasic() {
  return <ThemeToggle />;
}

export function ThemeToggleSizes() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle size="sm" />
      <ThemeToggle size="default" />
      <ThemeToggle size="lg" />
    </div>
  );
}

export function ThemeToggleOutline() {
  return <ThemeToggle variant="outline" />;
}
