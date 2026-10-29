"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bell } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { IconButton } from "../icon-button/index";
import { Notification } from "../notification/index";

interface NotificationCenterItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  unread?: boolean;
  icon?: React.ElementType;
}

interface NotificationCenterProps {
  notifications: NotificationCenterItem[];
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  /** Heading inside the popover. */
  title?: string;
  /** Accessible name for the bell trigger. */
  triggerLabel?: string;
  emptyLabel?: React.ReactNode;
  className?: string;
}

function NotificationCenter({
  notifications,
  onMarkAllRead,
  onDismiss,
  title = "Notifications",
  triggerLabel = "Notifications",
  emptyLabel = "You're all caught up.",
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((item) => item.unread).length;
  const accessibleName =
    unreadCount > 0
      ? `${triggerLabel} (${unreadCount} unread)`
      : triggerLabel;

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <IconButton
          variant="ghost"
          aria-label={accessibleName}
          className="relative"
        >
          <Bell />
          {unreadCount > 0 ? (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
            >
              {unreadCount}
            </span>
          ) : null}
        </IconButton>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="notification-center"
          aria-label={title}
          align="end"
          sideOffset={8}
          className={cn(
            "z-50 grid w-80 gap-3 rounded-lg border bg-popover p-3 text-popover-foreground shadow-md outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--radix-popper-transform-origin)]",
            className,
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{title}</p>
            {onMarkAllRead && unreadCount > 0 ? (
              <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
                Mark all read
              </Button>
            ) : null}
          </div>
          {notifications.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {emptyLabel}
            </p>
          ) : (
            <div className="grid max-h-80 gap-2 overflow-y-auto">
              {notifications.map((item) => (
                <Notification
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  timestamp={item.timestamp}
                  unread={item.unread}
                  icon={item.icon}
                  onDismiss={
                    onDismiss ? () => onDismiss(item.id) : undefined
                  }
                />
              ))}
            </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { NotificationCenter };
export type { NotificationCenterItem, NotificationCenterProps };
