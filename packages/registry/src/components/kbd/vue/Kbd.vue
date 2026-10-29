<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="
      cn(
        'pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-0.5 rounded border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </kbd>
</template>
