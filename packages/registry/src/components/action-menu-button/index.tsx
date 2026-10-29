"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Button, type ButtonProps } from "../button/index";

interface ActionMenuItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface ActionMenuButtonProps extends Omit<ButtonProps, "children"> {
  items: ActionMenuItem[];
  /** Accessible name of the trigger. */
  label?: string;
  align?: "start" | "center" | "end";
}

function ActionMenuButton({
  items,
  label = "Open actions",
  align = "end",
  variant = "ghost",
  size = "icon",
  ...props
}: ActionMenuButtonProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          data-slot="action-menu-button"
          variant={variant}
          size={size}
          aria-label={label}
          {...props}
        >
          <MoreHorizontal aria-hidden />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={4}
          className="z-50 min-w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              disabled={item.disabled}
              onSelect={item.onSelect}
              className={
                item.destructive
                  ? "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-destructive outline-none focus:bg-destructive/10 focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  : "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              }
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export { ActionMenuButton };
