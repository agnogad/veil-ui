<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="sidebar-header"
    :class="
      cn('flex h-14 shrink-0 items-center gap-2 border-b px-4', props.class)
    "
  >
    <slot />
  </div>
</template>
