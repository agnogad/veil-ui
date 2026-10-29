<script setup lang="ts">
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "reka-ui";

import { cn } from "@/lib/utils";

import ScrollBar from "./ScrollBar.vue";

const props = withDefaults(
  defineProps<{
    class?: string;
    type?: "auto" | "always" | "scroll" | "hover";
  }>(),
  { type: "hover" },
);
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    :type="type"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      class="size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
