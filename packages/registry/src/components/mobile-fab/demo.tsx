"use client";

import { MessageSquare, Plus } from "lucide-react";

import { MobileFab } from "./index";

export function MobileFabBasic() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border bg-muted/20">
      <p className="absolute left-4 top-4 text-sm text-muted-foreground">
        Thumb-friendly floating action
      </p>
      <MobileFab className="absolute bottom-4 right-4" aria-label="Create item">
        <Plus />
      </MobileFab>
    </div>
  );
}

export function MobileFabExtended() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border bg-muted/20">
      <p className="absolute left-4 top-4 text-sm text-muted-foreground">
        Extended label variant
      </p>
      <MobileFab
        className="absolute bottom-4 right-4"
        label="New chat"
        aria-label="New chat"
      >
        <MessageSquare />
      </MobileFab>
    </div>
  );
}
