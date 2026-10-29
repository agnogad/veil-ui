<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const classes = computed(() => cn("flex items-center justify-center", props.class));
</script>

<template>
  <div data-slot="center" :class="classes">
    <slot />
  </div>
</template>
