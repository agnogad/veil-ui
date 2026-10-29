<script setup lang="ts">
import { Dialog } from "@/components/ui/modal";

const props = defineProps<{
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}>();

const emit = defineEmits<{ "update:open": [value: boolean] }>();
</script>

<template>
  <Dialog
    :open="props.open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </Dialog>
</template>
