<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="sidebar-group-label"
    :class="
      cn(
        'px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
