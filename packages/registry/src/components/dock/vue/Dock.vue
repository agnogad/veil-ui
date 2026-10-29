<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { DockItem, DockProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DockProps>(), {
  label: "Dock",
});

function itemClasses(item: DockItem) {
  return cn(
    "group relative flex size-11 items-center justify-center rounded-xl border bg-card text-muted-foreground transition-transform hover:-translate-y-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    item.active && "border-foreground/30 text-foreground",
  );
}
</script>

<template>
  <div
    data-slot="dock"
    role="toolbar"
    :aria-label="label"
    v-bind="$attrs"
    :class="
      cn(
        'inline-flex items-end gap-1.5 rounded-2xl border bg-background/80 p-2 shadow-lg backdrop-blur',
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
        <span
          v-if="item.active"
          aria-hidden="true"
          class="absolute -bottom-0.5 size-1 rounded-full bg-foreground"
        />
      </a>
      <button
        v-else
        type="button"
        :title="item.label"
        :aria-current="item.active ? 'true' : undefined"
        :class="itemClasses(item)"
        @click="item.onClick?.()"
      >
        <component :is="item.icon" class="size-5" aria-hidden="true" />
        <span class="sr-only">{{ item.label }}</span>
        <span
          v-if="item.active"
          aria-hidden="true"
          class="absolute -bottom-0.5 size-1 rounded-full bg-foreground"
        />
      </button>
    </template>
  </div>
</template>
