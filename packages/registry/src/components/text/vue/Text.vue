<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { TextProps } from "./types";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const tones = {
  default: "",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
} as const;

const props = withDefaults(defineProps<TextProps>(), {
  as: "p",
  size: "base",
  weight: "normal",
  tone: "default",
  truncate: false,
});
</script>

<template>
  <component
    :is="props.as"
    data-slot="text"
    :class="
      cn(
        sizes[props.size],
        weights[props.weight],
        tones[props.tone],
        props.truncate && 'truncate',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>
