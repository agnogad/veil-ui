<script setup lang="ts">
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    orientation?: "vertical" | "horizontal";
  }>(),
  { orientation: "vertical" },
);

const classes = computed(() =>
  cn(
    "flex touch-none select-none p-px transition-colors",
    props.orientation === "vertical" &&
      "h-full w-2.5 border-l border-l-transparent",
    props.orientation === "horizontal" &&
      "h-2.5 flex-col border-t border-t-transparent",
    props.class,
  ),
);
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    :orientation="orientation"
    :class="classes"
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      class="relative flex-1 rounded-full bg-border"
    />
  </ScrollAreaScrollbar>
</template>
