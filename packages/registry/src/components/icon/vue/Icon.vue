<script setup lang="ts">
import { computed, type Component } from "vue";

import { cn } from "@/lib/utils";

const sizes = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

const props = withDefaults(
  defineProps<{
    icon: Component;
    size?: keyof typeof sizes;
    strokeWidth?: number;
    label?: string;
    class?: string;
  }>(),
  { size: "md", strokeWidth: 2 },
);

const classes = computed(() => cn(sizes[props.size], props.class));
</script>

<template>
  <component
    :is="props.icon"
    data-slot="icon"
    :aria-hidden="props.label ? undefined : true"
    :aria-label="props.label"
    :role="props.label ? 'img' : undefined"
    :stroke-width="props.strokeWidth"
    :class="classes"
  />
</template>
