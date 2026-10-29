<script setup lang="ts">
import { X } from "lucide-vue-next";
import { computed, ref, useId } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    value?: string[];
    modelValue?: string[];
    defaultValue?: string[];
    placeholder?: string;
    /** Accessible name for the input. */
    label?: string;
    disabled?: boolean;
    maxTags?: number;
    allowDuplicates?: boolean;
    id?: string;
    class?: string;
  }>(),
  {
    defaultValue: () => [],
    placeholder: "Add a tag",
    label: "Add tag",
    disabled: false,
    allowDuplicates: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [tags: string[]];
  valueChange: [tags: string[]];
}>();

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const inputRef = ref<HTMLInputElement | null>(null);
const internal = ref<string[]>([...props.defaultValue]);
const draft = ref("");
const tags = computed(() => props.value ?? props.modelValue ?? internal.value);

function update(next: string[]) {
  internal.value = next;
  emit("update:modelValue", next);
  emit("valueChange", next);
}

function addTags(raw: string[]) {
  const next = [...tags.value];
  for (const item of raw) {
    const tag = item.trim();
    if (!tag) continue;
    if (props.maxTags !== undefined && next.length >= props.maxTags) break;
    if (!props.allowDuplicates && next.includes(tag)) continue;
    next.push(tag);
  }
  if (next.length !== tags.value.length) update(next);
  draft.value = "";
}

function removeTag(tag: string) {
  update(tags.value.filter((item) => item !== tag));
  inputRef.value?.focus();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === ",") {
    event.preventDefault();
    addTags([draft.value]);
  } else if (
    event.key === "Backspace" &&
    draft.value === "" &&
    tags.value.length > 0
  ) {
    event.preventDefault();
    update(tags.value.slice(0, -1));
  }
}

function onPaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData("text") ?? "";
  if (!/[,;\n]/.test(text)) return;
  event.preventDefault();
  addTags(text.split(/[,;\n]/));
}
</script>

<template>
  <div
    data-slot="tags-input"
    :class="
      cn(
        'flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        disabled && 'pointer-events-none opacity-50',
        props.class,
      )
    "
    @click="inputRef?.focus()"
  >
    <span
      v-for="tag in tags"
      :key="tag"
      class="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
    >
      {{ tag }}
      <button
        type="button"
        :aria-label="`Remove tag ${tag}`"
        :disabled="disabled"
        class="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
        @click.stop="removeTag(tag)"
      >
        <X class="size-3" aria-hidden />
      </button>
    </span>
    <input
      :id="inputId"
      ref="inputRef"
      type="text"
      :value="draft"
      :disabled="disabled"
      :aria-label="label"
      :placeholder="tags.length === 0 ? placeholder : undefined"
      class="h-6 min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      @input="draft = ($event.target as HTMLInputElement).value"
      @blur="draft.trim() && addTags([draft])"
      @keydown="onKeydown"
      @paste="onPaste"
    />
  </div>
</template>
