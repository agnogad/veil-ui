<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const classes = computed(() => cn("grid gap-4", props.class));
</script>

<template>
  <div data-slot="section-content" :class="classes">
    <slot />
  </div>
</template>
