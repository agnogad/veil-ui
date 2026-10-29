"use client";

import { Button } from "../button/index";
import { Badge } from "../badge/index";
import { Stack } from "./index";

export function StackVertical() {
  return (
    <Stack gap="sm" className="w-full max-w-sm">
      <div className="rounded-md border p-3 text-sm">Design tokens</div>
      <div className="rounded-md border p-3 text-sm">Components</div>
      <div className="rounded-md border p-3 text-sm">Blocks</div>
    </Stack>
  );
}

export function StackHorizontal() {
  return (
    <Stack direction="row" gap="sm" align="center" wrap>
      <Badge>v0.1.0</Badge>
      <Badge variant="outline">MIT</Badge>
      <Badge variant="muted">25 components</Badge>
    </Stack>
  );
}

export function StackToolbar() {
  return (
    <Stack
      direction="row"
      gap="sm"
      align="center"
      justify="between"
      className="w-full max-w-sm rounded-md border p-2"
    >
      <span className="text-sm font-medium">Deployment</span>
      <Stack direction="row" gap="xs">
        <Button size="sm" variant="ghost">
          Logs
        </Button>
        <Button size="sm">Deploy</Button>
      </Stack>
    </Stack>
  );
}
