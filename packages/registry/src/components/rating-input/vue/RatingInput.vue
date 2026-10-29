<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    value?: number;
    modelValue?: number;
    defaultValue?: number;
    max?: number;
    readOnly?: boolean;
    disabled?: boolean;
    /** Accessible name for the rating group. */
    label?: string;
    /** Show the numeric value next to the stars. */
    showValue?: boolean;
    size?: "sm" | "md" | "lg";
    class?: string;
  }>(),
  {
    defaultValue: 0,
    max: 5,
    readOnly: false,
    disabled: false,
    label: "Rating",
    showValue: false,
    size: "md",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
  valueChange: [value: number];
}>();

const iconSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const groupRef = ref<HTMLDivElement | null>(null);
const internal = ref(props.defaultValue);
const hovered = ref<number | null>(null);
const current = computed(
  () => props.value ?? props.modelValue ?? internal.value,
);
const interactive = computed(() => !props.readOnly && !props.disabled);
const active = computed(() =>
  hovered.value !== null ? hovered.value : current.value,
);

function commit(next: number) {
  if (!interactive.value) return;
  internal.value = next;
  emit("update:modelValue", next);
  emit("valueChange", next);
}

function focusStar(star: number) {
  const buttons =
    groupRef.value?.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
  buttons?.[star - 1]?.focus();
}

function onHover(star: number) {
  if (interactive.value) hovered.value = star;
}

function onLeave() {
  hovered.value = null;
}

function onKeydown(star: number, event: KeyboardEvent) {
  let next: number | null = null;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    next = Math.min(props.max, star + 1);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    next = Math.max(1, star - 1);
  } else if (event.key === "Home") {
    next = 1;
  } else if (event.key === "End") {
    next = props.max;
  }

  if (next === null) return;
  event.preventDefault();
  commit(next);
  focusStar(next);
}
</script>

<template>
  <div
    data-slot="rating-input"
    :class="cn('flex items-center gap-2', props.class)"
  >
    <div
      ref="groupRef"
      role="radiogroup"
      :aria-label="label"
      :aria-readonly="readOnly || undefined"
      :aria-disabled="disabled || undefined"
      class="flex items-center gap-0.5"
      @mouseleave="onLeave"
    >
      <button
        v-for="star in max"
        :key="star"
        type="button"
        role="radio"
        :aria-checked="current === star"
        :aria-label="`${star} star${star === 1 ? '' : 's'}`"
        :tabindex="current === star || (current === 0 && star === 1) ? 0 : -1"
        :disabled="disabled"
        :class="
          cn(
            'rounded-sm p-0.5 text-muted-foreground/50 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            interactive && 'hover:text-amber-400',
            star <= active && 'text-amber-400',
          )
        "
        @click="commit(current === star ? 0 : star)"
        @mouseenter="onHover(star)"
        @focus="onHover(star)"
        @blur="onLeave"
        @keydown="onKeydown(star, $event)"
      >
        <Star
          :class="cn(iconSizes[size], star <= active && 'fill-current')"
          aria-hidden
        />
      </button>
    </div>
    <span
      v-if="showValue"
      class="text-sm tabular-nums text-muted-foreground"
    >
      {{ current }} / {{ max }}
    </span>
  </div>
</template>
