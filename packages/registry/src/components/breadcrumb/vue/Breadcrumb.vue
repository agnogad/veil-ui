<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <nav
    data-slot="breadcrumb"
    aria-label="breadcrumb"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </nav>
</template>
