<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { HeadingProps } from "./types";

const sizes = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
} as const;

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 2,
  weight: "semibold",
  tone: "default",
});
</script>

<template>
  <component
    :is="'h' + props.level"
    data-slot="heading"
    :data-level="props.level"
    :class="
      cn(
        'text-balance tracking-tight',
        sizes[props.size ?? props.level],
        weights[props.weight],
        props.tone === 'muted' && 'text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>
