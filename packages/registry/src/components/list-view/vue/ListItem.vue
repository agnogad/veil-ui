<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  title: string;
  description?: string;
  class?: string;
}>();
</script>

<template>
  <li
    data-slot="list-item"
    :class="
      cn(
        'flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40',
        props.class,
      )
    "
  >
    <div v-if="$slots.leading" class="shrink-0">
      <slot name="leading" />
    </div>
    <div class="min-w-0 flex-1">
      <div class="truncate text-sm font-medium">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="truncate text-sm text-muted-foreground">
        <slot name="description">{{ description }}</slot>
      </div>
      <slot />
    </div>
    <div v-if="$slots.trailing" class="shrink-0">
      <slot name="trailing" />
    </div>
  </li>
</template>
