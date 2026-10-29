import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { Card, CardContent } from "../card/index";

interface UserCardProps extends React.ComponentProps<"div"> {
  name: string;
  handle: string;
  bio?: React.ReactNode;
  avatarSrc?: string;
  stats?: { label: string; value: React.ReactNode }[];
  action?: React.ReactNode;
}

function UserCard({
  className,
  name,
  handle,
  bio,
  avatarSrc,
  stats,
  action,
  ...props
}: UserCardProps) {
  const fallback = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      data-slot="user-card"
      className={cn("max-w-sm gap-3", className)}
      {...props}
    >
      <CardContent className="flex items-start gap-3">
        <Avatar size="lg">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-sm text-muted-foreground">@{handle}</p>
            </div>
            {action}
          </div>
          {bio ? <p className="mt-2 text-sm text-muted-foreground">{bio}</p> : null}
        </div>
      </CardContent>
      {stats?.length ? (
        <CardContent className="flex gap-6 border-t pt-3 text-sm">
          {stats.map((stat) => (
            <span key={stat.label}>
              <strong className="font-semibold text-foreground">{stat.value}</strong>{" "}
              <span className="text-muted-foreground">{stat.label}</span>
            </span>
          ))}
        </CardContent>
      ) : null}
    </Card>
  );
}

export { UserCard };
