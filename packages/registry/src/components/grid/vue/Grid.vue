<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const columns = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
} as const;

const gaps = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

const props = withDefaults(
  defineProps<{
    cols?: keyof typeof columns;
    gap?: keyof typeof gaps;
    class?: string;
  }>(),
  { cols: 3, gap: "md" },
);

const classes = computed(() =>
  cn("grid", columns[props.cols], gaps[props.gap], props.class),
);
</script>

<template>
  <div data-slot="grid" :data-cols="cols" :class="classes">
    <slot />
  </div>
</template>
