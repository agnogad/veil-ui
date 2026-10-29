<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const grids = {
  start: {
    sm: "lg:grid-cols-[240px_1fr]",
    md: "lg:grid-cols-[320px_1fr]",
    lg: "lg:grid-cols-[400px_1fr]",
  },
  end: {
    sm: "lg:grid-cols-[1fr_240px]",
    md: "lg:grid-cols-[1fr_320px]",
    lg: "lg:grid-cols-[1fr_400px]",
  },
} as const;

const gaps = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
} as const;

const props = withDefaults(
  defineProps<{
    asidePosition?: "start" | "end";
    asideSize?: "sm" | "md" | "lg";
    gap?: keyof typeof gaps;
    stickyAside?: boolean;
    class?: string;
  }>(),
  {
    asidePosition: "end",
    asideSize: "md",
    gap: "md",
    stickyAside: false,
  },
);

const classes = computed(() =>
  cn(
    "grid min-h-0 grid-cols-1",
    grids[props.asidePosition][props.asideSize],
    gaps[props.gap],
    props.class,
  ),
);

const asideClasses = computed(() =>
  cn(
    "min-w-0",
    props.stickyAside && "lg:sticky lg:top-4 lg:self-start",
  ),
);
</script>

<template>
  <div data-slot="split-layout" :class="classes">
    <aside
      v-if="props.asidePosition === 'start'"
      data-slot="split-layout-aside"
      :class="asideClasses"
    >
      <slot name="aside" />
    </aside>
    <div data-slot="split-layout-main" class="min-w-0">
      <slot />
    </div>
    <aside
      v-if="props.asidePosition === 'end'"
      data-slot="split-layout-aside"
      :class="asideClasses"
    >
      <slot name="aside" />
    </aside>
  </div>
</template>
