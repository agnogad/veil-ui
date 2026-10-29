<script setup lang="ts">
import { Separator } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  }>(),
  { orientation: "horizontal", decorative: true },
);

const classes = computed(() =>
  cn(
    "shrink-0 bg-border",
    "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
    props.class,
  ),
);
</script>

<template>
  <Separator
    data-slot="separator"
    :orientation="orientation"
    :decorative="decorative"
    :class="classes"
  />
</template>
