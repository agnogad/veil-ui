<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <fieldset
    data-slot="field-group"
    :class="cn('grid min-w-0 gap-4 border-0 p-0', props.class)"
  >
    <slot />
  </fieldset>
</template>
