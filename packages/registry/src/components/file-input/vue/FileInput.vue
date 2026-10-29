<script setup lang="ts">
import { FileText, UploadCloud, X } from "lucide-vue-next";
import { computed, ref, useId } from "vue";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    id?: string;
    class?: string;
  }>(),
  { multiple: false, disabled: false },
);

const emit = defineEmits<{
  filesChange: [files: FileList | null];
}>();

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const descriptionId = computed(() =>
  props.error
    ? `${inputId.value}-error`
    : props.hint
      ? `${inputId.value}-hint`
      : undefined,
);

const inputRef = ref<HTMLInputElement | null>(null);
const names = ref<string[]>([]);
const dragging = ref(false);

function openPicker() {
  if (!props.disabled) inputRef.value?.click();
}

function handleFiles(list: FileList | null) {
  names.value = list ? Array.from(list).map((file) => file.name) : [];
  emit("filesChange", list);
}

function clearSelection() {
  if (inputRef.value) inputRef.value.value = "";
  names.value = [];
  emit("filesChange", null);
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  if (!props.disabled) dragging.value = true;
}

function onDragLeave() {
  dragging.value = false;
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  dragging.value = false;
  if (!props.disabled) handleFiles(event.dataTransfer?.files ?? null);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openPicker();
  }
}
</script>

<template>
  <div
    data-slot="file-input"
    :class="cn('flex w-full flex-col gap-1.5', props.class)"
  >
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium leading-none"
    >
      {{ label }}
    </label>

    <div
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled || undefined"
      :aria-describedby="descriptionId"
      :aria-invalid="error ? true : undefined"
      :aria-label="label ? undefined : 'Choose files'"
      :class="
        cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-input bg-transparent px-4 py-6 text-center text-sm shadow-xs outline-none transition-colors',
          'hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          dragging && 'border-primary bg-primary/5',
          disabled && 'pointer-events-none cursor-not-allowed opacity-50',
        )
      "
      @click="openPicker"
      @keydown="onKeydown"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <UploadCloud class="size-6 text-muted-foreground" aria-hidden />
      <span class="font-medium">
        {{ multiple ? "Drop files here or browse" : "Drop a file here or browse" }}
      </span>
      <span class="text-xs text-muted-foreground">
        {{ accept ? `Accepted: ${accept}` : "Any file type" }}
      </span>
    </div>

    <input
      :id="inputId"
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="sr-only"
      tabindex="-1"
      aria-hidden="true"
      @change="handleFiles(($event.target as HTMLInputElement).files)"
    />

    <ul v-if="names.length > 0" class="flex flex-col gap-1">
      <li
        v-for="name in names"
        :key="name"
        class="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <FileText class="size-4 shrink-0" aria-hidden />
        <span class="truncate">{{ name }}</span>
      </li>
    </ul>

    <Button
      v-if="names.length > 0 && !disabled"
      type="button"
      variant="ghost"
      size="sm"
      class="w-fit text-muted-foreground"
      @click="clearSelection"
    >
      <X aria-hidden />
      Clear selection
    </Button>

    <p
      v-if="error"
      :id="descriptionId"
      role="alert"
      class="text-sm text-destructive"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      :id="descriptionId"
      class="text-sm text-muted-foreground"
    >
      {{ hint }}
    </p>
  </div>
</template>
