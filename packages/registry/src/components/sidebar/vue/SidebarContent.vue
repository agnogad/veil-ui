<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="sidebar-content"
    :class="cn('flex-1 overflow-y-auto p-2', props.class)"
  >
    <slot />
  </div>
</template>
