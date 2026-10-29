<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <legend
    data-slot="field-group-legend"
    :class="cn('mb-3 text-sm font-medium', props.class)"
  >
    <slot />
  </legend>
</template>
