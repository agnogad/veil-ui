<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import type { MobileHeaderProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<MobileHeaderProps>(), {
  sticky: true,
});
</script>

<template>
  <header
    data-slot="mobile-header"
    v-bind="$attrs"
    :class="
      cn(
        'z-30 border-b bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur',
        sticky && 'sticky top-0',
        props.class,
      )
    "
  >
    <div class="flex h-14 items-center gap-2 px-3">
      <button
        v-if="props.onBack"
        type="button"
        aria-label="Go back"
        class="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        @click="props.onBack()"
      >
        <ChevronLeft class="size-5" aria-hidden="true" />
      </button>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold leading-tight">
          <slot name="title">{{ title }}</slot>
        </p>
        <p
          v-if="subtitle || $slots.subtitle"
          class="truncate text-xs text-muted-foreground"
        >
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>
      <div v-if="$slots.actions" class="flex shrink-0 items-center gap-1">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
