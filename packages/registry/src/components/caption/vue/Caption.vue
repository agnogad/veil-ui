<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    tone?: "default" | "muted";
    class?: string;
  }>(),
  { tone: "muted" },
);

const classes = computed(() =>
  cn(
    "text-xs leading-normal",
    props.tone === "muted" ? "text-muted-foreground" : "text-foreground",
    props.class,
  ),
);
</script>

<template>
  <span data-slot="caption" :class="classes">
    <slot />
  </span>
</template>
