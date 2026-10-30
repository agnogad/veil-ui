<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="mobile-app-shell"
    :class="
      cn(
        'relative flex h-[600px] w-full max-w-sm flex-col overflow-hidden rounded-xl border bg-background shadow-sm',
        props.class,
      )
    "
  >
    <slot name="header" />
    <main class="flex-1 overflow-y-auto overscroll-contain">
      <slot />
    </main>
    <slot name="footer" />
    <slot name="floating" />
  </div>
</template>
