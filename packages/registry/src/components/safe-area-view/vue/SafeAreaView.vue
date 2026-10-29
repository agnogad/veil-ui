<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import type { SafeAreaEdge, SafeAreaViewProps } from "./types";

const edgeClasses: Record<SafeAreaEdge, string> = {
  top: "pt-[env(safe-area-inset-top)]",
  right: "pr-[env(safe-area-inset-right)]",
  bottom: "pb-[env(safe-area-inset-bottom)]",
  left: "pl-[env(safe-area-inset-left)]",
};

const props = withDefaults(defineProps<SafeAreaViewProps>(), {
  edges: () => ["top", "right", "bottom", "left"],
});

const classes = computed(() =>
  cn(
    props.edges.map((edge) => edgeClasses[edge]),
    props.class,
  ),
);
</script>

<template>
  <div
    data-slot="safe-area-view"
    :data-edges="props.edges.join(' ')"
    :class="classes"
  >
    <slot />
  </div>
</template>
