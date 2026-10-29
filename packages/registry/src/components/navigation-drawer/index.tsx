"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface NavigationDrawerProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  side?: "left" | "right";
}

function NavigationDrawer({
  children,
  trigger,
  open,
  onOpenChange,
  title,
  description,
  side = "left",
}: NavigationDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          data-slot="navigation-drawer"
          className={cn(
            "fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col border bg-background p-4 shadow-lg focus:outline-none",
            side === "left" ? "left-0 border-r" : "right-0 border-l",
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <Dialog.Title className="text-sm font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close drawer"
                className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          {description ? (
            <Dialog.Description className="mb-4 text-xs text-muted-foreground">
              {description}
            </Dialog.Description>
          ) : (
            <Dialog.Description className="sr-only">
              {title} navigation
            </Dialog.Description>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { NavigationDrawer };
export type { NavigationDrawerProps };
