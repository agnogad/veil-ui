<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { containerVariants, type ContainerVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    size?: ContainerVariants["size"];
    class?: string;
  }>(),
  { size: "lg" },
);

const classes = computed(() =>
  cn(containerVariants({ size: props.size }), props.class),
);
</script>

<template>
  <div data-slot="container" :data-size="size" :class="classes">
    <slot />
  </div>
</template>
