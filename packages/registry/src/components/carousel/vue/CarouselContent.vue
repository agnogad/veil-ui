<script setup lang="ts">
import { onMounted, ref } from "vue";

import { cn } from "@/lib/utils";

import { useCarousel } from "./use-carousel";

const props = defineProps<{ class?: string }>();
const { track, count, orientation, sync } = useCarousel();
const element = ref<HTMLElement | null>(null);

onMounted(() => {
  track.value = element.value;
  count.value = element.value?.querySelectorAll("[data-slot=carousel-item]").length ?? 0;
  sync();
});
</script>

<template>
  <div :class="cn('overflow-hidden', orientation === 'vertical' && 'h-80')">
    <div
      ref="element"
      data-slot="carousel-content"
      :class="
        cn(
          'flex',
          orientation === 'vertical'
            ? 'h-full flex-col overflow-y-auto'
            : 'overflow-x-auto',
          '-ml-4',
          props.class,
        )
      "
      @scroll="sync"
    >
      <slot />
    </div>
  </div>
</template>
