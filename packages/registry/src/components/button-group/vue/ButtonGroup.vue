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
    data-slot="button-group"
    :data-orientation="orientation"
    role="group"
    :class="
      cn(
        'inline-flex w-fit items-stretch',
        orientation === 'horizontal' &&
          '[&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:not(:first-child)]:-ml-px',
        orientation === 'vertical' &&
          'flex-col [&>*]:rounded-none [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*:not(:first-child)]:-mt-px',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
