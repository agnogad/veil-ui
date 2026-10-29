<script setup lang="ts">
import { BottomSheetDescription } from "@/components/ui/bottom-sheet";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <BottomSheetDescription :class="props.class">
    <slot />
  </BottomSheetDescription>
</template>
