<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { ParagraphProps } from "./types";

const sizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
} as const;

const props = withDefaults(defineProps<ParagraphProps>(), {
  size: "base",
  tone: "default",
});
</script>

<template>
  <p
    data-slot="paragraph"
    :class="
      cn(
        sizes[props.size],
        'leading-relaxed text-pretty',
        props.tone === 'muted' && 'text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </p>
</template>
