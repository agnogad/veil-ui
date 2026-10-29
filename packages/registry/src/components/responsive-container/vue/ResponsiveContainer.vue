<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const widths = {
  xs: "max-w-sm",
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

const gutters = {
  none: "px-0",
  sm: "px-2 sm:px-4",
  md: "px-4 sm:px-6",
  lg: "px-6 sm:px-8",
} as const;

const props = withDefaults(
  defineProps<{
    maxWidth?: keyof typeof widths;
    gutter?: keyof typeof gutters;
    fluid?: boolean;
    class?: string;
  }>(),
  { maxWidth: "lg", gutter: "md", fluid: false },
);

const classes = computed(() =>
  cn(
    "w-full",
    !props.fluid && "mx-auto",
    widths[props.maxWidth],
    gutters[props.gutter],
    props.class,
  ),
);
</script>

<template>
  <div data-slot="responsive-container" :data-max-width="maxWidth" :class="classes">
    <slot />
  </div>
</template>
