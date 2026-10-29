<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "@/lib/utils";

import type { MobileToolbarItem, MobileToolbarProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<MobileToolbarProps>();
const attrs = useAttrs();

const label = computed(
  () => (attrs["aria-label"] as string | undefined) ?? "Toolbar",
);

function itemClasses(item: MobileToolbarItem) {
  return cn(
    "relative inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
    item.active
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  );
}
</script>

<template>
  <div
    data-slot="mobile-toolbar"
    role="toolbar"
    :aria-label="label"
    v-bind="$attrs"
    :class="
      cn(
        'flex w-full items-center gap-1 overflow-x-auto border-y bg-background px-2 py-1.5 [scrollbar-width:none]',
        props.class,
      )
    "
  >
    <button
      v-for="item in items"
      :key="item.label"
      type="button"
      :aria-pressed="item.active"
      :class="itemClasses(item)"
      @click="item.onClick?.()"
    >
      <span v-if="item.icon" class="[&_svg]:size-3.5" aria-hidden="true">
        <component :is="item.icon" />
      </span>
      <span>{{ item.label }}</span>
      <span
        v-if="item.badge !== undefined"
        class="rounded-full bg-muted px-1.5 text-[10px] leading-4 text-muted-foreground"
      >
        {{ item.badge }}
      </span>
    </button>
  </div>
</template>
