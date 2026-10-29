<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { LogoCloudItem } from "./types";

const columns = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-5",
  6: "grid-cols-3 sm:grid-cols-6",
} as const;

const props = withDefaults(
  defineProps<{
    items: LogoCloudItem[];
    columns?: keyof typeof columns;
    class?: string;
  }>(),
  { columns: 4 },
);
</script>

<template>
  <ul
    data-slot="logo-cloud"
    :class="
      cn(
        'grid list-none items-center justify-items-center gap-6',
        columns[props.columns],
        props.class,
      )
    "
  >
    <li
      v-for="item in props.items"
      :key="item.name"
      data-slot="logo-cloud-item"
    >
      <a
        v-if="item.href"
        :href="item.href"
        class="rounded-sm opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <img
          v-if="item.src"
          :src="item.src"
          :alt="item.name"
          class="h-8 w-auto opacity-60 grayscale transition-opacity hover:opacity-100"
        />
        <span v-else class="text-sm font-semibold text-muted-foreground">
          {{ item.name }}
        </span>
      </a>
      <template v-else>
        <img
          v-if="item.src"
          :src="item.src"
          :alt="item.name"
          class="h-8 w-auto opacity-60 grayscale transition-opacity hover:opacity-100"
        />
        <span v-else class="text-sm font-semibold text-muted-foreground">
          {{ item.name }}
        </span>
      </template>
    </li>
  </ul>
</template>
