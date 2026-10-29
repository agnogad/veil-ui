<script setup lang="ts">
import { computed, type StyleValue } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    ratio?: number;
    style?: StyleValue;
    class?: string;
  }>(),
  { ratio: 16 / 9 },
);

const classes = computed(() =>
  cn("relative w-full overflow-hidden", props.class),
);
</script>

<template>
  <div
    data-slot="aspect-ratio"
    :style="[{ aspectRatio: String(ratio) }, props.style]"
    :class="classes"
  >
    <slot />
  </div>
</template>
