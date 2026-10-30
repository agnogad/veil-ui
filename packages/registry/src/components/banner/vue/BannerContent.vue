<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="banner-content"
    :class="cn('grid flex-1 gap-1', props.class)"
  >
    <slot />
  </div>
</template>
