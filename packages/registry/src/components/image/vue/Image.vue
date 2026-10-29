<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const ratioClass = {
  auto: "",
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[3/1]",
} as const;

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    ratio?: keyof typeof ratioClass;
    class?: string;
  }>(),
  { ratio: "auto" },
);

const classes = computed(() =>
  cn("max-w-full rounded-lg object-cover", ratioClass[props.ratio], props.class),
);
</script>

<template>
  <img
    data-slot="image"
    :src="props.src"
    :alt="props.alt"
    :class="classes"
  />
</template>
