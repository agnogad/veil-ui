<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="banner-actions"
    :class="cn('mt-2 flex flex-wrap items-center gap-2', props.class)"
  >
    <slot />
  </div>
</template>
