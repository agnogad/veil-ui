<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; for?: string }>();
</script>

<template>
  <label
    data-slot="label"
    :for="props.for"
    :class="
      cn(
        'flex select-none items-center gap-2 text-sm font-medium leading-none',
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </label>
</template>
