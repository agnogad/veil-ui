<script setup lang="ts">
import { BottomSheetFooter } from "@/components/ui/bottom-sheet";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <BottomSheetFooter :class="props.class">
    <slot />
  </BottomSheetFooter>
</template>
