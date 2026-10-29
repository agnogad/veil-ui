import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { Button } from "../button/index";
import { Card, CardContent, CardHeader, CardTitle } from "../card/index";

interface ProfileCardProps extends React.ComponentProps<"div"> {
  name: string;
  role: string;
  bio?: React.ReactNode;
  avatarSrc?: string;
  avatarFallback?: string;
  followers?: number;
  following?: number;
  action?: React.ReactNode;
}

function ProfileCard({
  className,
  name,
  role,
  bio,
  avatarSrc,
  avatarFallback,
  followers,
  following,
  action,
  ...props
}: ProfileCardProps) {
  const fallback =
    avatarFallback ??
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <Card data-slot="profile-card" className={cn("max-w-sm", className)} {...props}>
      <CardHeader className="items-center text-center">
        <Avatar size="lg" className="size-16 text-lg">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle>{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
      {bio ? (
        <CardContent className="text-center text-sm text-muted-foreground">
          {bio}
        </CardContent>
      ) : null}
      {followers !== undefined || following !== undefined ? (
        <CardContent className="flex justify-center gap-6 text-sm">
          {followers !== undefined ? (
            <span>
              <strong className="font-semibold text-foreground">{followers}</strong>{" "}
              <span className="text-muted-foreground">followers</span>
            </span>
          ) : null}
          {following !== undefined ? (
            <span>
              <strong className="font-semibold text-foreground">{following}</strong>{" "}
              <span className="text-muted-foreground">following</span>
            </span>
          ) : null}
        </CardContent>
      ) : null}
      <CardContent>
        {action ?? (
          <Button type="button" className="w-full">
            Follow
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export { ProfileCard };
