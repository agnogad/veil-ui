<script setup lang="ts">
import { Minus, Plus } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    modelValue?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    id?: string;
  }>(),
  { defaultValue: 0, step: 1, disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [value: number] }>();

const internal = ref(props.defaultValue);
const draft = ref<string | null>(null);
const current = computed(() => props.modelValue ?? internal.value);
const atMin = computed(
  () => props.min !== undefined && current.value <= props.min,
);
const atMax = computed(
  () => props.max !== undefined && current.value >= props.max,
);

function clamp(value: number) {
  let next = value;
  if (props.min !== undefined) next = Math.max(next, props.min);
  if (props.max !== undefined) next = Math.min(next, props.max);
  return Number(next.toFixed(10));
}

function commit(next: number) {
  if (!Number.isFinite(next)) return;
  const clamped = clamp(next);
  if (props.modelValue === undefined) internal.value = clamped;
  emit("update:modelValue", clamped);
}

function nudge(direction: 1 | -1) {
  draft.value = null;
  commit(current.value + direction * props.step);
}

function handleInput(event: Event) {
  const raw = (event.target as HTMLInputElement).value;
  draft.value = raw;
  const parsed = Number(raw);
  if (raw.trim() !== "" && Number.isFinite(parsed)) commit(parsed);
}
</script>

<template>
  <div
    data-slot="number-input"
    :class="
      cn(
        'flex h-9 w-full items-center overflow-hidden rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-[input[aria-invalid=true]]:border-destructive dark:bg-input/30',
        disabled && 'pointer-events-none opacity-50',
        props.class,
      )
    "
  >
    <button
      type="button"
      tabindex="-1"
      aria-label="Decrease value"
      :disabled="disabled || atMin"
      class="inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      @click="nudge(-1)"
    >
      <Minus class="size-3.5" aria-hidden="true" />
    </button>
    <input
      :id="id"
      v-bind="$attrs"
      type="number"
      inputmode="decimal"
      role="spinbutton"
      :value="draft ?? String(current)"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="current"
      class="h-full w-full min-w-0 bg-transparent text-center text-sm tabular-nums outline-none [appearance:textfield] placeholder:text-muted-foreground [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      @input="handleInput"
      @blur="draft = null"
    />
    <button
      type="button"
      tabindex="-1"
      aria-label="Increase value"
      :disabled="disabled || atMax"
      class="inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      @click="nudge(1)"
    >
      <Plus class="size-3.5" aria-hidden="true" />
    </button>
  </div>
</template>
