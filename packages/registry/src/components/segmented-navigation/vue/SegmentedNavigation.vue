<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";

import { cn } from "@/lib/utils";

import type { SegmentedNavigationProps } from "./types";

const props = withDefaults(defineProps<SegmentedNavigationProps>(), {
  label: "Segmented navigation",
});

const emit = defineEmits<{ "update:value": [value: string] }>();

const itemRefs = ref<Array<HTMLButtonElement | null>>([]);

function setItemRef(
  el: Element | ComponentPublicInstance | null,
  index: number,
) {
  itemRefs.value[index] = (el as HTMLButtonElement | null) ?? null;
}

function select(value: string) {
  props.onValueChange?.(value);
  emit("update:value", value);
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();

  const direction = event.key === "ArrowRight" ? 1 : -1;
  const total = props.options.length;

  for (let step = 1; step <= total; step += 1) {
    const next = ((index + direction * step) % total + total) % total;
    const option = props.options[next];
    if (option && !option.disabled) {
      itemRefs.value[next]?.focus();
      select(option.value);
      return;
    }
  }
}
</script>

<template>
  <div
    role="tablist"
    :aria-label="label"
    data-slot="segmented-navigation"
    :class="
      cn(
        'inline-flex items-center gap-1 rounded-lg border bg-muted p-1',
        props.class,
      )
    "
  >
    <button
      v-for="(option, index) in options"
      :key="option.value"
      :ref="(el) => setItemRef(el, index)"
      type="button"
      role="tab"
      :aria-selected="option.value === value"
      :disabled="option.disabled"
      :class="
        cn(
          'rounded-md px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          option.value === value
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )
      "
      @click="select(option.value)"
      @keydown="handleKeyDown($event, index)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
