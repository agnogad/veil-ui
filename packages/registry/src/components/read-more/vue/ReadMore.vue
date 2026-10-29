<script setup lang="ts">
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

import type { ReadMoreLines, ReadMoreProps } from "./types";

const props = withDefaults(defineProps<ReadMoreProps>(), {
  lines: 3,
  moreLabel: "Read more",
  lessLabel: "Show less",
  defaultExpanded: false,
});

const clamps: Record<ReadMoreLines, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

const expanded = ref(props.defaultExpanded);
const contentClass = computed(() =>
  expanded.value ? undefined : clamps[props.lines],
);
</script>

<template>
  <div data-slot="read-more" :class="cn('grid gap-2', props.class)">
    <div :class="contentClass">
      <slot />
    </div>
    <button
      type="button"
      :aria-expanded="expanded"
      class="w-fit rounded-sm text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      @click="expanded = !expanded"
    >
      {{ expanded ? lessLabel : moreLabel }}
    </button>
  </div>
</template>
