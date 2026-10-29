"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

interface CommandMenuItem {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  onSelect?: () => void;
}

interface CommandMenuProps {
  items: CommandMenuItem[];
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  title?: string;
}

function CommandMenu({
  items,
  trigger,
  open,
  onOpenChange,
  placeholder = "Search commands…",
  emptyMessage = "No results found.",
  title = "Command menu",
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  const groups = new Map<string, CommandMenuItem[]>();
  for (const item of items) {
    const group = item.group ?? "Actions";
    const groupItems = groups.get(group) ?? [];
    groupItems.push(item);
    groups.set(group, groupItems);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-24 z-50 w-[min(32rem,90vw)] -translate-x-1/2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl focus:outline-none">
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search and run a command.
          </Dialog.Description>
          <Command loop label={placeholder}>
            <div className="flex items-center gap-2 border-b px-3">
              <Search className="size-4 text-muted-foreground" aria-hidden />
              <Command.Input
                placeholder={placeholder}
                aria-label={placeholder}
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Command.List className="max-h-72 overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </Command.Empty>
              {Array.from(groups).map(([group, groupItems]) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {groupItems.map((item) => (
                    <Command.Item
                      key={item.label}
                      value={item.value ?? item.label}
                      onSelect={() => {
                        item.onSelect?.();
                        handleOpenChange(false);
                      }}
                      className="flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      {item.icon ? (
                        <span className="text-muted-foreground [&_svg]:size-4">
                          {item.icon}
                        </span>
                      ) : null}
                      <span>{item.label}</span>
                      {item.shortcut ? (
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                          {item.shortcut}
                        </span>
                      ) : null}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { CommandMenu };
export type { CommandMenuItem, CommandMenuProps };
