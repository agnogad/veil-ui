<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <aside
    data-slot="sidebar"
    :class="cn('flex h-full w-64 flex-col border-r bg-background', props.class)"
  >
    <slot />
  </aside>
</template>
