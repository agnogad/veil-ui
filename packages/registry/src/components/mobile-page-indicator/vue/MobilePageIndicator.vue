<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import type { MobilePageIndicatorProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<MobilePageIndicatorProps>(), {
  label: "Pages",
});

const pages = computed(() =>
  Array.from({ length: props.count }, (_, page) => page),
);

function dotClasses(active: boolean) {
  return cn(
    "h-1.5 rounded-full transition-all",
    active ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30",
  );
}
</script>

<template>
  <div
    data-slot="mobile-page-indicator"
    role="group"
    :aria-label="label"
    v-bind="$attrs"
    :class="cn('flex items-center justify-center gap-1.5', props.class)"
  >
    <template v-for="page in pages" :key="page">
      <span
        v-if="!props.onSelect"
        :aria-current="page === index ? 'true' : undefined"
        :class="dotClasses(page === index)"
      />
      <button
        v-else
        type="button"
        :aria-label="`Go to page ${page + 1}`"
        :aria-current="page === index ? 'true' : undefined"
        :class="
          cn(
            dotClasses(page === index),
            'outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )
        "
        @click="props.onSelect(page)"
      >
        <span class="sr-only">Page {{ page + 1 }}</span>
      </button>
    </template>
    <span class="sr-only">Page {{ index + 1 }} of {{ count }}</span>
  </div>
</template>
