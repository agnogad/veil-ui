<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  label?: string;
  description?: string;
  class?: string;
}>();
</script>

<template>
  <div
    data-slot="sticky-bottom-cta"
    :class="
      cn(
        'sticky bottom-0 z-30 flex items-center justify-between gap-3 border-t bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur',
        props.class,
      )
    "
  >
    <div class="min-w-0">
      <p v-if="label || $slots.label" class="truncate text-sm font-semibold">
        <slot name="label">{{ label }}</slot>
      </p>
      <p
        v-if="description || $slots.description"
        class="truncate text-xs text-muted-foreground"
      >
        <slot name="description">{{ description }}</slot>
      </p>
      <slot />
    </div>
    <div v-if="$slots.action" class="shrink-0">
      <slot name="action" />
    </div>
  </div>
</template>
