<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { toPercent, useResizable } from "./use-resizable";

const props = withDefaults(
  defineProps<{
    defaultSize?: string | number;
    minSize?: string | number;
    maxSize?: string | number;
    class?: string;
  }>(),
  { defaultSize: "50%" },
);

const { sizes, registerPanel } = useResizable();
const index = registerPanel(toPercent(props.defaultSize, 50));

const style = computed(() => ({
  flexGrow: String(sizes.value[index] ?? 1),
  flexShrink: "1",
  flexBasis: "0%",
}));
</script>

<template>
  <div
    data-slot="resizable-panel"
    :data-panel-index="index"
    :class="cn('min-w-0 overflow-hidden', props.class)"
    :style="style"
  >
    <slot />
  </div>
</template>
