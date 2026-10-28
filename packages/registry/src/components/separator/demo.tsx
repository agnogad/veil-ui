"use client";

import { Separator } from "./index";

export function SeparatorHorizontal() {
  return (
    <div className="w-full max-w-sm text-sm">
      <div className="space-y-1">
        <p className="font-medium">Veil UI</p>
        <p className="text-muted-foreground">Copy-paste React components.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between text-muted-foreground">
        <span>v0.1.0</span>
        <span>MIT</span>
      </div>
    </div>
  );
}

export function SeparatorVertical() {
  return (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Components</span>
      <Separator orientation="vertical" />
      <span>Changelog</span>
    </div>
  );
}

export function SeparatorWithLabel() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
      <Separator className="flex-1" />
      <span>Or continue with</span>
      <Separator className="flex-1" />
    </div>
  );
}
