<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { NavigationRailItem, NavigationRailProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<NavigationRailProps>(), {
  label: "Primary",
});

function itemClasses(item: NavigationRailItem) {
  return cn(
    "relative flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    item.active &&
      "bg-accent text-accent-foreground before:absolute before:-left-3 before:h-6 before:w-0.5 before:rounded-full before:bg-foreground",
  );
}
</script>

<template>
  <nav
    data-slot="navigation-rail"
    :aria-label="label"
    v-bind="$attrs"
    :class="
      cn(
        'flex w-16 flex-col items-center gap-2 border-r bg-background py-3',
        props.class,
      )
    "
  >
    <template v-for="item in items" :key="item.label">
      <a
        v-if="item.href"
        :href="item.href"
        :title="item.label"
        :aria-current="item.active ? 'page' : undefined"
        :class="itemClasses(item)"
      >
        <component :is="item.icon" class="size-5" aria-hidden="true" />
        <span class="sr-only">{{ item.label }}</span>
      </a>
      <button
        v-else
        type="button"
        :title="item.label"
        :aria-current="item.active ? 'page' : undefined"
        :class="itemClasses(item)"
        @click="props.onSelect?.(item)"
      >
        <component :is="item.icon" class="size-5" aria-hidden="true" />
        <span class="sr-only">{{ item.label }}</span>
      </button>
    </template>
  </nav>
</template>
