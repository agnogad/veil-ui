<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="sidebar-group"
    :class="cn('grid gap-1 py-2', props.class)"
  >
    <slot />
  </div>
</template>
