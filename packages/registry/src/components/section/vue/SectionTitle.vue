<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const classes = computed(() =>
  cn("text-lg font-semibold tracking-tight", props.class),
);
</script>

<template>
  <h2 data-slot="section-title" :class="classes">
    <slot />
  </h2>
</template>
