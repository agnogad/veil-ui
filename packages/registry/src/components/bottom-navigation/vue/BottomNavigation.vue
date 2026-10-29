<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { BottomNavigationItem, BottomNavigationProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BottomNavigationProps>(), {
  variant: "default",
});

function itemClasses(item: BottomNavigationItem) {
  return cn(
    "relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    item.active &&
      props.variant === "default" &&
      "text-foreground after:absolute after:inset-x-4 after:top-0 after:h-0.5 after:rounded-full after:bg-foreground",
    item.active && props.variant === "floating" && "bg-muted text-foreground",
  );
}
</script>

<template>
  <nav
    data-slot="bottom-navigation"
    :data-variant="variant"
    aria-label="Bottom"
    :class="
      cn(
        'flex w-full items-stretch justify-around bg-background',
        variant === 'default' &&
          'border-t pb-[env(safe-area-inset-bottom)]',
        variant === 'floating' &&
          'mx-auto w-[calc(100%-2rem)] max-w-md gap-1 rounded-2xl border p-1 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <template v-for="item in items" :key="item.label">
      <a
        v-if="item.href"
        :href="item.href"
        :aria-current="item.active ? 'page' : undefined"
        :class="itemClasses(item)"
      >
        <span class="relative">
          <component :is="item.icon" class="size-5" aria-hidden="true" />
          <span
            v-if="item.badge || $slots.badge"
            class="absolute -right-2 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-medium leading-4 text-primary-foreground"
          >
            <slot name="badge" :item="item">{{ item.badge }}</slot>
          </span>
        </span>
        <span class="text-[11px] font-medium">{{ item.label }}</span>
      </a>
      <button
        v-else
        type="button"
        :aria-current="item.active ? 'page' : undefined"
        :class="itemClasses(item)"
        @click="props.onSelect?.(item)"
      >
        <span class="relative">
          <component :is="item.icon" class="size-5" aria-hidden="true" />
          <span
            v-if="item.badge || $slots.badge"
            class="absolute -right-2 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-medium leading-4 text-primary-foreground"
          >
            <slot name="badge" :item="item">{{ item.badge }}</slot>
          </span>
        </span>
        <span class="text-[11px] font-medium">{{ item.label }}</span>
      </button>
    </template>
  </nav>
</template>
