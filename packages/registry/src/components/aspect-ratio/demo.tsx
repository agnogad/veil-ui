"use client";

import { ImageIcon } from "lucide-react";

import { AspectRatio } from "./index";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground">
      <ImageIcon className="size-5" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function AspectRatioBasic() {
  return (
    <AspectRatio className="max-w-md rounded-lg border">
      <Placeholder label="16 / 9" />
    </AspectRatio>
  );
}

export function AspectRatioSquare() {
  return (
    <AspectRatio ratio={1} className="max-w-48 rounded-lg border">
      <Placeholder label="1 / 1" />
    </AspectRatio>
  );
}

export function AspectRatioPortrait() {
  return (
    <AspectRatio ratio={3 / 4} className="max-w-40 rounded-lg border">
      <Placeholder label="3 / 4" />
    </AspectRatio>
  );
}
