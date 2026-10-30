<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { createCarouselContext, provideCarousel } from "./use-carousel";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    class?: string;
    label?: string;
  }>(),
  { orientation: "horizontal", label: "Carousel" },
);

const state = createCarouselContext();
state.orientation.value = props.orientation;

function size() {
  const element = state.track.value;
  if (!element) return 0;
  return props.orientation === "vertical"
    ? element.clientHeight
    : element.clientWidth;
}

function scrollTo(index: number) {
  const element = state.track.value;
  if (!element) return;
  const clamped = Math.min(Math.max(index, 0), Math.max(state.count.value - 1, 0));
  element.scrollTo({
    [props.orientation === "vertical" ? "top" : "left"]: clamped * size(),
    behavior: "smooth",
  });
}

function scrollPrev() {
  scrollTo(state.index.value - 1);
}

function scrollNext() {
  scrollTo(state.index.value + 1);
}

function sync() {
  const element = state.track.value;
  if (!element) return;
  const itemSize = size() || 1;
  const offset =
    props.orientation === "vertical" ? element.scrollTop : element.scrollLeft;
  state.index.value = Math.round(offset / itemSize);
  const max =
    props.orientation === "vertical"
      ? element.scrollHeight - element.clientHeight
      : element.scrollWidth - element.clientWidth;
  state.canPrev.value = offset > 2;
  state.canNext.value = offset < max - 2;
}

provideCarousel({
  ...state,
  orientation: computed(() => props.orientation),
  scrollPrev,
  scrollNext,
  scrollTo,
  sync,
});
</script>

<template>
  <div
    role="region"
    aria-roledescription="carousel"
    data-slot="carousel"
    :aria-label="label"
    :class="cn('relative', props.class)"
    @keydown.left.prevent="scrollPrev"
    @keydown.right.prevent="scrollNext"
  >
    <slot />
  </div>
</template>
