<script setup lang="ts">
import { Stack } from "@/components/ui/stack";

const props = withDefaults(
  defineProps<{
    direction?: "row" | "column";
    gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "between" | "around";
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
</script>

<template>
  <Stack
    data-slot="flex"
    :direction="props.direction"
    :gap="props.gap"
    :align="props.align"
    :justify="props.justify"
    :wrap="props.wrap"
    :class="props.class"
  >
    <slot />
  </Stack>
</template>
