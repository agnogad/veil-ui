"use client";

import { X } from "lucide-react";

import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Cluster } from "./index";

export function ClusterBasic() {
  return (
    <Cluster>
      <Badge>React</Badge>
      <Badge variant="outline">Tailwind</Badge>
      <Badge variant="muted">Radix UI</Badge>
      <Badge variant="outline">TypeScript</Badge>
    </Cluster>
  );
}

export function ClusterBetween() {
  return (
    <Cluster justify="between" className="w-full rounded-md border p-3">
      <span className="text-sm font-medium">Filters</span>
      <Button size="sm" variant="outline">
        Reset
      </Button>
    </Cluster>
  );
}

export function ClusterTags() {
  return (
    <Cluster gap="xs">
      {["design", "docs", "registry"].map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md border bg-muted/40 px-2 py-1 text-xs"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            className="rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <X className="size-3" aria-hidden />
          </button>
        </span>
      ))}
    </Cluster>
  );
}
