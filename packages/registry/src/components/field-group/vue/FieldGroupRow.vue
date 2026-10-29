<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="field-group-row"
    :class="cn('grid gap-4 sm:grid-cols-2', props.class)"
  >
    <slot />
  </div>
</template>
