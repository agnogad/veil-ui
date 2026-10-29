<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    v-if="$slots.default"
    data-slot="form-error"
    role="alert"
    :class="
      cn(
        'rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
