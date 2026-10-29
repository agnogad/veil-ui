<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const clamps = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
} as const;

const props = withDefaults(
  defineProps<{
    lines?: keyof typeof clamps;
    class?: string;
  }>(),
  { lines: 2 },
);

const classes = computed(() => cn(clamps[props.lines], props.class));
</script>

<template>
  <p data-slot="truncated-text" :data-lines="props.lines" :class="classes">
    <slot />
  </p>
</template>
