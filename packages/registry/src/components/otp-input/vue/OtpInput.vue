<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    length?: number;
    modelValue?: string;
    defaultValue?: string;
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    length: 6,
    defaultValue: "",
    label: "One-time code",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "complete": [value: string];
}>();

const refs = ref<Array<HTMLInputElement | null>>([]);
const internal = ref<string[]>(
  Array.from({ length: props.length }, (_, index) => props.defaultValue[index] ?? ""),
);

const chars = computed(() => {
  const source = props.modelValue;
  return Array.from({ length: props.length }, (_, index) =>
    source !== undefined
      ? (source[index] ?? "")
      : (internal.value[index] ?? ""),
  );
});

function setInputRef(
  el: Element | ComponentPublicInstance | null,
  index: number,
) {
  refs.value[index] = el as HTMLInputElement | null;
}

function commit(next: string[]) {
  const code = next.join("");
  if (props.modelValue === undefined) internal.value = next;
  emit("update:modelValue", code);
  if (next.every((char) => char !== "")) emit("complete", code);
}

function focus(index: number) {
  const input = refs.value[Math.min(Math.max(index, 0), props.length - 1)];
  input?.focus();
  input?.select();
}

function handleChange(index: number, raw: string) {
  const digit = raw.replace(/\D/g, "").slice(-1);
  const next = [...chars.value];

  if (!digit) {
    next[index] = "";
    commit(next);
    return;
  }

  next[index] = digit;
  commit(next);

  const nextEmpty = next.findIndex(
    (char, position) => position > index && char === "",
  );
  focus(nextEmpty === -1 ? index + 1 : nextEmpty);
}

function handleKeyDown(index: number, event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    focus(index - 1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    focus(index + 1);
  } else if (event.key === "Backspace" && chars.value[index] === "") {
    event.preventDefault();
    const next = [...chars.value];
    if (index > 0) {
      next[index - 1] = "";
      commit(next);
      focus(index - 1);
    }
  } else if (event.key === "Delete" && chars.value[index] !== "") {
    const next = [...chars.value];
    next[index] = "";
    commit(next);
  } else if (event.key === "Home") {
    event.preventDefault();
    focus(0);
  } else if (event.key === "End") {
    event.preventDefault();
    focus(props.length - 1);
  }
}

function handlePaste(index: number, event: ClipboardEvent) {
  const digits = (event.clipboardData?.getData("text") ?? "")
    .replace(/\D/g, "")
    .slice(0, props.length - index);
  if (digits.length === 0) return;

  event.preventDefault();
  const next = [...chars.value];
  digits.split("").forEach((digit, offset) => {
    next[index + offset] = digit;
  });
  commit(next);
  focus(index + digits.length);
}
</script>

<template>
  <div
    role="group"
    :aria-label="label"
    data-slot="otp-input"
    :class="cn('flex items-center gap-2', props.class)"
  >
    <input
      v-for="(_, index) in length"
      :key="index"
      :ref="(el) => setInputRef(el, index)"
      type="text"
      inputmode="numeric"
      :autocomplete="index === 0 ? 'one-time-code' : 'off'"
      pattern="[0-9]*"
      maxlength="1"
      :value="chars[index] ?? ''"
      :disabled="disabled"
      :aria-label="`${label}, digit ${index + 1}`"
      class="size-10 rounded-md border border-input bg-transparent text-center text-lg font-medium tabular-nums shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
      @input="handleChange(index, ($event.target as HTMLInputElement).value)"
      @keydown="handleKeyDown(index, $event as KeyboardEvent)"
      @paste="handlePaste(index, $event)"
      @focus="($event.target as HTMLInputElement).select()"
    />
  </div>
</template>
