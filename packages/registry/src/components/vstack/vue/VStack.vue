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
    align: "stretch",
    justify: "start",
    wrap: false,
  },
);
</script>

<template>
  <Stack
    data-slot="v-stack"
    direction="column"
    :gap="props.gap"
    :align="props.align"
    :justify="props.justify"
    :wrap="props.wrap"
    :class="props.class"
  >
    <slot />
  </Stack>
</template>
