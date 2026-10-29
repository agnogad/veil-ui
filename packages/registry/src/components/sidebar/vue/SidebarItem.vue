<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { SidebarItemProps } from "./types";

const props = withDefaults(defineProps<SidebarItemProps>(), {
  active: false,
});
</script>

<template>
  <a
    data-slot="sidebar-item"
    :aria-current="props.active ? 'page' : undefined"
    :class="
      cn(
        'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.active && 'bg-accent font-medium text-accent-foreground',
        props.class,
      )
    "
  >
    <slot />
  </a>
</template>
