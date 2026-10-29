<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <dt data-slot="description-term" :class="cn('text-sm font-medium', props.class)">
    <slot />
  </dt>
</template>
