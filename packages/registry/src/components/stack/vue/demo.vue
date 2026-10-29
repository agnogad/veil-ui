<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Stack } from "./index";
</script>

<template>
  <Stack gap="sm" class="w-full max-w-sm">
    <div class="rounded-md border p-3 text-sm">Design tokens</div>
    <div class="rounded-md border p-3 text-sm">Components</div>
    <div class="rounded-md border p-3 text-sm">Blocks</div>
  </Stack>

  <Stack direction="row" gap="sm" align="center" wrap class="mt-4">
    <Badge>v0.1.0</Badge>
    <Badge variant="outline">MIT</Badge>
    <Badge variant="muted">25 components</Badge>
  </Stack>

  <Stack
    direction="row"
    gap="sm"
    align="center"
    justify="between"
    class="mt-4 w-full max-w-sm rounded-md border p-2"
  >
    <span class="text-sm font-medium">Deployment</span>
    <Stack direction="row" gap="xs">
      <Button size="sm" variant="ghost">Logs</Button>
      <Button size="sm">Deploy</Button>
    </Stack>
  </Stack>
</template>
