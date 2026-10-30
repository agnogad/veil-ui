<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <p
    data-slot="banner-title"
    :class="cn('font-medium leading-none', props.class)"
  >
    <slot />
  </p>
</template>
