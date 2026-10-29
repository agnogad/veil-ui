"use client";

import { MessageSquare, Pencil, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Fab } from "./index";

function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border bg-muted/20">
      <p className="absolute left-4 top-4 text-sm text-muted-foreground">
        Floating above the page
      </p>
      {children}
    </div>
  );
}

export function FabBasic() {
  return (
    <Stage>
      <Fab aria-label="Create item" className="absolute bottom-4 right-4">
        <Plus />
      </Fab>
    </Stage>
  );
}

export function FabExtended() {
  return (
    <Stage>
      <Fab
        label="New project"
        className="absolute bottom-4 right-4"
        aria-label="New project"
      >
        <Pencil />
      </Fab>
    </Stage>
  );
}

export function FabPositions() {
  return (
    <Stage>
      <Fab
        aria-label="Start chat"
        className="absolute bottom-4 left-4"
        size="lg"
      >
        <MessageSquare />
      </Fab>
      <Fab aria-label="Create item" className="absolute bottom-4 right-4">
        <Plus />
      </Fab>
    </Stage>
  );
}
