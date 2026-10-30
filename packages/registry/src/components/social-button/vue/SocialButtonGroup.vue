<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div data-slot="social-button-group" :class="cn('grid w-full gap-2', props.class)">
    <slot />
  </div>
</template>
