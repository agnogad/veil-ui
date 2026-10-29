<script setup lang="ts">
import { Stack } from "@/components/ui/stack";

const props = withDefaults(
  defineProps<{
    gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "between" | "around";
    wrap?: boolean;
    class?: string;
  }>(),
  {
    gap: "md",
    align: "center",
    justify: "start",
    wrap: false,
  },
);
</script>

<template>
  <Stack
    data-slot="h-stack"
    direction="row"
    :gap="props.gap"
    :align="props.align"
    :justify="props.justify"
    :wrap="props.wrap"
    :class="props.class"
  >
    <slot />
  </Stack>
</template>
