<script setup lang="ts">
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

import type { HamburgerMenuProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<HamburgerMenuProps>(), {
  label: "Toggle navigation",
});

const emit = defineEmits<{ "update:open": [open: boolean] }>();

const internalOpen = ref(false);
const isControlled = computed(() => props.open !== undefined);
const isOpen = computed(() =>
  isControlled.value ? props.open : internalOpen.value,
);

const bars = [0, 1, 2];

function toggle() {
  const next = !isOpen.value;
  if (!isControlled.value) internalOpen.value = next;
  props.onOpenChange?.(next);
  emit("update:open", next);
}
</script>

<template>
  <button
    type="button"
    data-slot="hamburger-menu"
    :data-state="isOpen ? 'open' : 'closed'"
    :aria-label="label"
    :aria-expanded="isOpen"
    :class="
      cn(
        'inline-flex size-9 flex-col items-center justify-center gap-1.5 rounded-md border transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class,
      )
    "
    @click="toggle"
    v-bind="$attrs"
  >
    <span
      v-for="index in bars"
      :key="index"
      aria-hidden="true"
      :class="
        cn(
          'h-px w-4 bg-foreground transition-transform',
          isOpen && index === 0 && 'translate-y-[7px] rotate-45',
          isOpen && index === 1 && 'opacity-0',
          isOpen && index === 2 && '-translate-y-[7px] -rotate-45',
        )
      "
    />
  </button>
</template>
