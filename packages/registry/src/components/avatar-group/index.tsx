import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";

interface AvatarGroupUser {
  name: string;
  src?: string;
}

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  users: AvatarGroupUser[];
  max?: number;
  size?: "sm" | "default" | "lg";
  label?: string;
}

function AvatarGroup({
  className,
  users,
  max = 4,
  size = "default",
  label,
  ...props
}: AvatarGroupProps) {
  const visible = users.slice(0, max);
  const remaining = users.length - visible.length;
  const accessibleLabel =
    label ?? `Group of ${users.length} ${users.length === 1 ? "person" : "people"}`;

  return (
    <div
      data-slot="avatar-group"
      role="group"
      aria-label={accessibleLabel}
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    >
      {visible.map((user) => {
        const fallback = user.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        return (
          <Avatar
            key={user.name}
            size={size}
            title={user.name}
            className="ring-2 ring-background"
          >
            {user.src ? <AvatarImage src={user.src} alt={user.name} /> : null}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        );
      })}
      {remaining > 0 ? (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background",
            size === "sm" ? "size-6 text-[10px]" : size === "lg" ? "size-10 text-sm" : "size-8",
          )}
          aria-label={`${remaining} more`}
        >
          +{remaining}
        </span>
      ) : null}
    </div>
  );
}

export { AvatarGroup, type AvatarGroupUser };
