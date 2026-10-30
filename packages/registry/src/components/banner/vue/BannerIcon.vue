<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="banner-icon"
    :class="cn('mt-0.5 shrink-0 [&_svg]:size-4', props.class)"
  >
    <slot />
  </div>
</template>
