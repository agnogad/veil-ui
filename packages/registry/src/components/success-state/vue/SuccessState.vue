<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import type { SuccessStateProps } from "./types";

const props = withDefaults(defineProps<SuccessStateProps>(), {
  title: "All done",
});
</script>

<template>
  <div
    data-slot="success-state"
    role="status"
    :class="
      cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-6 py-12 text-center',
        props.class,
      )
    "
  >
    <div
      aria-hidden
      class="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    >
      <CheckCircle2 class="size-5" />
    </div>
    <div class="grid gap-1">
      <p class="text-sm font-medium text-foreground">
        <slot name="title">{{ title }}</slot>
      </p>
      <p
        v-if="description || $slots.description"
        class="text-sm text-muted-foreground"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>
