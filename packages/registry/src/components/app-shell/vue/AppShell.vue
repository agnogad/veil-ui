<script setup lang="ts">
import { cn } from "@/lib/utils";

const sidebarWidths = {
  sm: "lg:grid-cols-[220px_1fr]",
  md: "lg:grid-cols-[280px_1fr]",
  lg: "lg:grid-cols-[340px_1fr]",
} as const;

const props = withDefaults(
  defineProps<{
    sidebarWidth?: keyof typeof sidebarWidths;
    class?: string;
  }>(),
  { sidebarWidth: "md" },
);
</script>

<template>
  <div
    data-slot="app-shell"
    :class="
      cn(
        'grid min-h-dvh grid-rows-[auto_1fr] bg-background',
        props.class,
      )
    "
  >
    <header
      v-if="$slots.header"
      data-slot="app-shell-header"
      class="sticky top-0 z-30 border-b bg-background/80 backdrop-blur"
    >
      <slot name="header" />
    </header>
    <div
      :class="
        cn('grid min-h-0', $slots.sidebar && sidebarWidths[props.sidebarWidth])
      "
    >
      <aside
        v-if="$slots.sidebar"
        data-slot="app-shell-sidebar"
        class="hidden min-h-0 overflow-y-auto border-r bg-muted/20 lg:block"
      >
        <slot name="sidebar" />
      </aside>
      <main data-slot="app-shell-main" class="min-w-0 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
