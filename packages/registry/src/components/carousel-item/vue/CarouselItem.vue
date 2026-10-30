<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    class?: string;
  }>(),
  { orientation: "horizontal" },
);
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    :class="
      cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        props.orientation === 'vertical' ? 'pt-4' : 'pl-4',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
