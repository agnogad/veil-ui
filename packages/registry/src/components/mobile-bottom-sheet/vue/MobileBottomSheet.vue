<script setup lang="ts">
import { BottomSheet } from "@/components/ui/bottom-sheet";

const props = defineProps<{
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}>();

const emit = defineEmits<{ "update:open": [value: boolean] }>();
</script>

<template>
  <BottomSheet
    :open="props.open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </BottomSheet>
</template>
