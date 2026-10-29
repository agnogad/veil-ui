<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <dd
    data-slot="description-details"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </dd>
</template>
