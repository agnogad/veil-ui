<script setup lang="ts">
import { X } from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Cluster } from "./index";
</script>

<template>
  <Cluster>
    <Badge>React</Badge>
    <Badge variant="outline">Tailwind</Badge>
    <Badge variant="muted">Radix UI</Badge>
    <Badge variant="outline">TypeScript</Badge>
  </Cluster>

  <Cluster justify="between" class="mt-4 w-full rounded-md border p-3">
    <span class="text-sm font-medium">Filters</span>
    <Button size="sm" variant="outline">Reset</Button>
  </Cluster>

  <Cluster gap="xs" class="mt-4">
    <span
      v-for="tag in ['design', 'docs', 'registry']"
      :key="tag"
      class="inline-flex items-center gap-1 rounded-md border bg-muted/40 px-2 py-1 text-xs"
    >
      {{ tag }}
      <button
        type="button"
        :aria-label="`Remove ${tag}`"
        class="rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <X class="size-3" aria-hidden="true" />
      </button>
    </span>
  </Cluster>
</template>
