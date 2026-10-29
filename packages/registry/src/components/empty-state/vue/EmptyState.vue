<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { EmptyStateProps } from "./types";

const props = defineProps<EmptyStateProps>();
</script>

<template>
  <div
    data-slot="empty-state"
    :class="
      cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center',
        props.class,
      )
    "
  >
    <div
      v-if="icon || $slots.icon"
      aria-hidden
      class="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
    >
      <slot name="icon">
        <component :is="icon" class="size-5" />
      </slot>
    </div>
    <div class="grid gap-1">
      <p class="text-sm font-medium">
        <slot name="title">{{ title }}</slot>
      </p>
      <p
        v-if="description || $slots.description"
        class="text-sm text-muted-foreground"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <slot />
    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>
