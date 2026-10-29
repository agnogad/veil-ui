<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const tones = {
  success: {
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  warning: {
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  danger: {
    badge: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  info: {
    badge: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  neutral: {
    badge: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
} as const;

const props = withDefaults(
  defineProps<{
    status?: keyof typeof tones;
    class?: string;
  }>(),
  { status: "neutral" },
);

const tone = computed(() => tones[props.status]);
</script>

<template>
  <span
    data-slot="status-badge"
    :data-status="props.status"
    :class="
      cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        tone.badge,
        props.class,
      )
    "
  >
    <span
      aria-hidden="true"
      :class="cn('size-1.5 rounded-full', tone.dot)"
    />
    <slot />
  </span>
</template>
