<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <code
    data-slot="code"
    :class="
      cn(
        'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground',
        props.class,
      )
    "
  >
    <slot />
  </code>
</template>
