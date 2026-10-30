<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    as?: "ul" | "ol";
    variant?: "disc" | "decimal" | "none";
    spacing?: "sm" | "md" | "lg";
    class?: string;
  }>(),
  { as: "ul", variant: "disc", spacing: "md" },
);

const variants = {
  disc: "list-disc pl-5",
  decimal: "list-decimal pl-5",
  none: "list-none pl-0",
};

const spacings = {
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-3",
};

const classes = computed(() =>
  cn(
    "marker:text-muted-foreground",
    variants[props.variant],
    spacings[props.spacing],
    props.class,
  ),
);
</script>

<template>
  <component :is="as" data-slot="list" :class="classes">
    <slot />
  </component>
</template>
