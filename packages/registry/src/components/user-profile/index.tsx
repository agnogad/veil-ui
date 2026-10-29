import { CalendarDays, Link2, MapPin } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { Card, CardContent, CardFooter, CardHeader } from "../card/index";

interface UserProfileStat {
  label: string;
  value: React.ReactNode;
}

interface UserProfileProps extends Omit<React.ComponentProps<"div">, "title"> {
  name: string;
  handle?: string;
  bio?: React.ReactNode;
  avatarSrc?: string;
  location?: string;
  website?: string;
  joined?: string;
  stats?: UserProfileStat[];
  actions?: React.ReactNode;
}

function UserProfile({
  className,
  name,
  handle,
  bio,
  avatarSrc,
  location,
  website,
  joined,
  stats = [],
  actions,
  ...props
}: UserProfileProps) {
  const fallback = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      data-slot="user-profile"
      className={cn("max-w-xl overflow-hidden py-0", className)}
      {...props}
    >
      <div className="h-24 bg-gradient-to-r from-primary/20 via-muted to-background" />
      <CardHeader className="-mt-10 px-5">
        <Avatar size="lg" className="ring-4 ring-card">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-base font-semibold">{name}</h2>
          {handle ? (
            <p className="text-sm text-muted-foreground">@{handle}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 px-5">
        {bio ? <p className="text-sm text-muted-foreground">{bio}</p> : null}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden /> {location}
            </span>
          ) : null}
          {website ? (
            <a
              href={website}
              className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
            >
              <Link2 className="size-3.5" aria-hidden /> {website}
            </a>
          ) : null}
          {joined ? (
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" aria-hidden /> Joined {joined}
            </span>
          ) : null}
        </div>
        {stats.length > 0 ? (
          <dl className="grid grid-cols-3 gap-2 rounded-lg border bg-muted/20 p-3 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-sm font-semibold">{stat.value}</dd>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </CardContent>
      {actions ? (
        <CardFooter className="border-t px-5 py-3">{actions}</CardFooter>
      ) : null}
    </Card>
  );
}

export { UserProfile };
export type { UserProfileProps, UserProfileStat };
