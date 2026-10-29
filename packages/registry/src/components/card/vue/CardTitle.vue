<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="card-title"
    :class="cn('text-base font-medium leading-none', props.class)"
  >
    <slot />
  </div>
</template>
