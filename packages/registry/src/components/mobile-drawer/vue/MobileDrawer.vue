<script setup lang="ts">
import { Drawer } from "@/components/ui/drawer";

const props = defineProps<{
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}>();

const emit = defineEmits<{ "update:open": [value: boolean] }>();
</script>

<template>
  <Drawer
    :open="props.open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </Drawer>
</template>
