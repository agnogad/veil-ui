"use client";

import { ArrowUpRight, MoreHorizontal } from "lucide-react";

import { Button } from "../button/index";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
      {initials}
    </span>
  );
}

export function CardBasic() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deployment settings</CardTitle>
        <CardDescription>
          Configure how your project is built and served.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Changes apply to the next production deployment.
        </p>
      </CardContent>
    </Card>
  );
}

export function CardWithFooter() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Invite teammates</CardTitle>
        <CardDescription>Anyone with the link can request access.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 rounded-md border px-2.5 py-1.5">
          <Avatar initials="VA" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Veil Admin</p>
            <p className="truncate text-xs text-muted-foreground">
              admin@veil.dev
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Send invite</Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardWithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project members</CardTitle>
        <CardDescription>3 of 10 seats used.</CardDescription>
        <CardAction>
          <Button size="icon" variant="ghost" aria-label="More options">
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        {["Ada Lovelace", "Grace Hopper", "Alan Turing"].map((name) => (
          <div key={name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Avatar initials={name.slice(0, 1)} />
              <span className="text-sm">{name}</span>
            </div>
            <span className="text-xs text-muted-foreground">Member</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function CardMetric() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardDescription>Requests this month</CardDescription>
        <CardTitle className="text-3xl font-semibold tracking-tight">
          128,430
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowUpRight className="size-4" />
          <span className="font-medium text-foreground">12.4%</span>
          vs last month
        </p>
      </CardContent>
    </Card>
  );
}
