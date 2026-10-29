<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const columns = {
  start: {
    sm: "lg:grid-cols-[220px_1fr]",
    md: "lg:grid-cols-[260px_1fr]",
    lg: "lg:grid-cols-[300px_1fr]",
  },
  end: {
    sm: "lg:grid-cols-[1fr_220px]",
    md: "lg:grid-cols-[1fr_260px]",
    lg: "lg:grid-cols-[1fr_300px]",
  },
} as const;

const props = withDefaults(
  defineProps<{
    sidebarPosition?: "start" | "end";
    sidebarSize?: "sm" | "md" | "lg";
    stickySidebar?: boolean;
    class?: string;
  }>(),
  {
    sidebarPosition: "start",
    sidebarSize: "md",
    stickySidebar: true,
  },
);

const classes = computed(() =>
  cn(
    "mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6",
    columns[props.sidebarPosition][props.sidebarSize],
    props.class,
  ),
);

const asideClasses = computed(() =>
  cn(
    "min-w-0",
    props.stickySidebar && "lg:sticky lg:top-8 lg:self-start",
  ),
);
</script>

<template>
  <div data-slot="sidebar-layout" :class="classes">
    <aside
      v-if="props.sidebarPosition === 'start'"
      data-slot="sidebar-layout-sidebar"
      :class="asideClasses"
    >
      <slot name="sidebar" />
    </aside>
    <div data-slot="sidebar-layout-content" class="min-w-0">
      <div v-if="$slots.header" data-slot="sidebar-layout-header" class="mb-6">
        <slot name="header" />
      </div>
      <slot />
      <div v-if="$slots.footer" data-slot="sidebar-layout-footer" class="mt-8">
        <slot name="footer" />
      </div>
    </div>
    <aside
      v-if="props.sidebarPosition === 'end'"
      data-slot="sidebar-layout-sidebar"
      :class="asideClasses"
    >
      <slot name="sidebar" />
    </aside>
  </div>
</template>
