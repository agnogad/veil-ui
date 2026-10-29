<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
} as const;

const props = withDefaults(
  defineProps<{
    size?: keyof typeof sizes;
    class?: string;
  }>(),
  { size: "lg" },
);

const gutter = "mx-auto w-full px-4 sm:px-6";
const contentClasses = computed(() => cn(gutter, sizes[props.size]));
</script>

<template>
  <div
    data-slot="page-shell"
    :class="cn('flex min-h-dvh flex-col', props.class)"
  >
    <header v-if="$slots.header" data-slot="page-shell-header" class="border-b">
      <div :class="contentClasses">
        <slot name="header" />
      </div>
    </header>
    <main data-slot="page-shell-main" class="flex-1">
      <div :class="cn(contentClasses, 'py-8')">
        <slot />
      </div>
    </main>
    <footer v-if="$slots.footer" data-slot="page-shell-footer" class="border-t">
      <div :class="cn(contentClasses, 'py-6')">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>
