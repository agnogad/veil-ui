<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const tones = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  busy: "bg-red-500",
  away: "bg-amber-500",
} as const;

const props = withDefaults(
  defineProps<{
    status?: keyof typeof tones;
    label?: string;
    pulse?: boolean;
    class?: string;
  }>(),
  { status: "online", pulse: false },
);

const tone = computed(() => tones[props.status]);
</script>

<template>
  <span
    data-slot="status-indicator"
    :data-status="props.status"
    :class="
      cn(
        'inline-flex items-center gap-1.5 text-xs text-muted-foreground',
        props.class,
      )
    "
  >
    <span class="relative flex size-2" aria-hidden="true">
      <span
        v-if="props.pulse"
        :class="
          cn(
            'absolute inline-flex size-full animate-ping rounded-full opacity-75',
            tone,
          )
        "
      />
      <span
        :class="cn('relative inline-flex size-2 rounded-full', tone)"
      />
    </span>
    {{ props.label ?? props.status }}
  </span>
</template>
