<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { HStack } from "./index";
</script>

<template>
  <HStack gap="sm">
    <Badge>React</Badge>
    <Badge variant="outline">Tailwind</Badge>
    <Badge variant="muted">Radix UI</Badge>
  </HStack>

  <HStack justify="between" class="mt-4 w-full rounded-md border p-3">
    <span class="text-sm font-medium">Filters</span>
    <HStack gap="sm">
      <Button size="sm" variant="ghost">Clear</Button>
      <Button size="sm">Apply</Button>
    </HStack>
  </HStack>

  <HStack gap="xs" wrap class="mt-4 max-w-sm">
    <span
      v-for="tag in ['design', 'docs', 'registry', 'tokens', 'cli', 'a11y']"
      :key="tag"
      class="rounded-md border bg-muted/40 px-2 py-1 text-xs"
    >
      {{ tag }}
    </span>
  </HStack>
</template>
