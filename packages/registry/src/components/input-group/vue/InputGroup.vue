<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="input-group"
    :class="
      cn(
        'flex h-9 w-full items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow,border-color]',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        'has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-destructive/20',
        '[&>input]:h-full [&>input]:min-w-0 [&>input]:flex-1 [&>input]:rounded-none [&>input]:border-0 [&>input]:bg-transparent [&>input]:shadow-none',
        '[&>input]:focus-visible:border-0 [&>input]:focus-visible:ring-0',
        '[&>input]:disabled:opacity-50',
        'dark:bg-input/30',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
