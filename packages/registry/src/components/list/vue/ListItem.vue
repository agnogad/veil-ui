<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <li data-slot="list-item" :class="cn('leading-relaxed', props.class)">
    <slot />
  </li>
</template>
