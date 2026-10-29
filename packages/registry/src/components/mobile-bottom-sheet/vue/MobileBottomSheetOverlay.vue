<script setup lang="ts">
import { BottomSheetOverlay } from "@/components/ui/bottom-sheet";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <BottomSheetOverlay :class="props.class" />
</template>
