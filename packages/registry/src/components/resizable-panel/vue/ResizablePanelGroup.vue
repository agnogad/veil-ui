<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { cn } from "@/lib/utils";

import { createResizableContext, provideResizable } from "./use-resizable";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    class?: string;
  }>(),
  { orientation: "horizontal" },
);

const state = createResizableContext();
state.orientation.value = props.orientation;
provideResizable(state);

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  state.container.value = container.value;
});

const classes = computed(() =>
  cn(
    "flex size-full",
    props.orientation === "vertical" && "flex-col",
    props.class,
  ),
);
</script>

<template>
  <div
    ref="container"
    data-slot="resizable-panel-group"
    :data-orientation="orientation"
    :class="classes"
  >
    <slot />
  </div>
</template>
