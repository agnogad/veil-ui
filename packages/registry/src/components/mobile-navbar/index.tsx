"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobileNavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

interface MobileNavbarProps
  extends Omit<React.ComponentProps<"header">, "title"> {
  title: React.ReactNode;
  links: MobileNavbarLink[];
  actions?: React.ReactNode;
}

function MobileNavbar({
  title,
  links,
  actions,
  className,
  ...props
}: MobileNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-slot="mobile-navbar"
      className={cn(
        "flex h-14 w-full items-center gap-3 border-b bg-background/95 px-4 backdrop-blur",
        className,
      )}
      {...props}
    >
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background p-4 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out [--veil-animation-duration:300ms] [--veil-exit-duration:200ms] data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-sm font-semibold">
                {title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </Dialog.Close>
            </div>
            <nav aria-label="Mobile" className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    link.active && "bg-accent font-medium text-accent-foreground",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {actions ? (
              <div className="mt-auto border-t pt-4">{actions}</div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <span className="flex-1 truncate text-sm font-semibold">{title}</span>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export { MobileNavbar };
export type { MobileNavbarLink, MobileNavbarProps };
