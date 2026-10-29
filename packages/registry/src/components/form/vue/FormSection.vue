<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  title?: string;
  description?: string;
  class?: string;
}>();
</script>

<template>
  <div
    data-slot="form-section"
    :class="cn('grid gap-4', props.class)"
  >
    <div
      v-if="title || description || $slots.title || $slots.description"
      class="grid gap-1"
    >
      <slot name="title">
        <h3
          v-if="title"
          class="text-base font-semibold tracking-tight"
        >
          {{ title }}
        </h3>
      </slot>
      <slot name="description">
        <p v-if="description" class="text-sm text-muted-foreground">
          {{ description }}
        </p>
      </slot>
    </div>
    <slot />
  </div>
</template>
