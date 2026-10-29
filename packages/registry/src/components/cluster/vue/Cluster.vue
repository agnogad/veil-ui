<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const gaps = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

const alignments = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
} as const;

const justifications = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
} as const;

const props = withDefaults(
  defineProps<{
    gap?: keyof typeof gaps;
    align?: keyof typeof alignments;
    justify?: keyof typeof justifications;
    class?: string;
  }>(),
  { gap: "sm", align: "center", justify: "start" },
);

const classes = computed(() =>
  cn(
    "flex flex-wrap",
    gaps[props.gap],
    alignments[props.align],
    justifications[props.justify],
    props.class,
  ),
);
</script>

<template>
  <div data-slot="cluster" :class="classes">
    <slot />
  </div>
</template>
