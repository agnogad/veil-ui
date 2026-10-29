<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { alignments, type FormActionsAlign } from "./types";

const props = withDefaults(
  defineProps<{ class?: string; align?: FormActionsAlign }>(),
  { align: "end" },
);

const classes = computed(() =>
  cn(
    "flex flex-wrap items-center gap-2 border-t pt-4",
    alignments[props.align],
    props.class,
  ),
);
</script>

<template>
  <div data-slot="form-actions" :data-align="align" :class="classes">
    <slot />
  </div>
</template>
