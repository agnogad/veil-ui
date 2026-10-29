<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const sizes = {
  xs: "size-1",
  sm: "size-2",
  md: "size-4",
  lg: "size-6",
  xl: "size-8",
} as const;

const props = defineProps<{
  size?: keyof typeof sizes;
  class?: string;
}>();

const classes = computed(() =>
  cn(props.size ? cn("shrink-0", sizes[props.size]) : "flex-1", props.class),
);
</script>

<template>
  <div aria-hidden="true" data-slot="spacer" :class="classes" />
</template>
