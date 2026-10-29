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
  stretch: "items-stretch",
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
    direction?: "row" | "column";
    gap?: keyof typeof gaps;
    align?: keyof typeof alignments;
    justify?: keyof typeof justifications;
    wrap?: boolean;
    class?: string;
  }>(),
  {
    direction: "column",
    gap: "md",
    align: "stretch",
    justify: "start",
    wrap: false,
  },
);

const classes = computed(() =>
  cn(
    "flex",
    props.direction === "row" ? "flex-row" : "flex-col",
    gaps[props.gap],
    alignments[props.align],
    justifications[props.justify],
    props.wrap && "flex-wrap",
    props.class,
  ),
);
</script>

<template>
  <div data-slot="stack" :data-direction="direction" :class="classes">
    <slot />
  </div>
</template>
