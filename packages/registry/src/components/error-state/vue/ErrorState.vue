<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import type { ErrorStateProps } from "./types";

const props = withDefaults(defineProps<ErrorStateProps>(), {
  title: "Something went wrong",
  description: "An unexpected error occurred. Please try again.",
});
</script>

<template>
  <div
    data-slot="error-state"
    role="alert"
    :class="
      cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-12 text-center',
        props.class,
      )
    "
  >
    <div
      aria-hidden
      class="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive"
    >
      <AlertTriangle class="size-5" />
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
