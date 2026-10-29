<script setup lang="ts">
import { BottomSheetHeader } from "@/components/ui/bottom-sheet";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <BottomSheetHeader :class="props.class">
    <slot />
  </BottomSheetHeader>
</template>
