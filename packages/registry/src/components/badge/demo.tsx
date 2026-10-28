"use client";

import { ArrowUpRight, CircleCheck } from "lucide-react";

import { Badge } from "./index";

export function BadgeBasic() {
  return <Badge>New</Badge>;
}

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

export function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline">
        <CircleCheck /> Operational
      </Badge>
      <Badge variant="muted">
        v0.1.0 <ArrowUpRight />
      </Badge>
    </div>
  );
}

export function BadgeAsChild() {
  return (
    <Badge asChild variant="outline">
      <a href="/docs/changelog">Changelog</a>
    </Badge>
  );
}
