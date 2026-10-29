<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

type FabPosition = "bottom-right" | "bottom-left" | "bottom-center";
type FabSize = "default" | "lg";

const positions: Record<FabPosition, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
};

const sizes: Record<FabSize, string> = {
  default: "size-12",
  lg: "size-14",
};

const props = withDefaults(
  defineProps<{
    class?: string;
    position?: FabPosition;
    size?: FabSize;
    label?: string;
    type?: "button" | "submit" | "reset";
  }>(),
  { position: "bottom-right", size: "default", type: "button" },
);

const classes = computed(() =>
  cn(
    "fixed z-50 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg outline-none transition-[color,background-color,box-shadow] hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
    positions[props.position],
    props.label ? "h-12 px-5 text-sm font-medium" : sizes[props.size],
    props.class,
  ),
);
</script>

<template>
  <button
    data-slot="fab"
    :data-position="position"
    :type="type"
    :class="classes"
  >
    <slot />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
