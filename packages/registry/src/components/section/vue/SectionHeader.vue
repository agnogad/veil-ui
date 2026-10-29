<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const classes = computed(() =>
  cn("flex flex-wrap items-start justify-between gap-3", props.class),
);
</script>

<template>
  <div data-slot="section-header" :class="classes">
    <slot />
  </div>
</template>
