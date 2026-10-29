<script setup lang="ts">
import { CloudUpload } from "lucide-vue-next";
import { computed, ref, useId } from "vue";
import type { Component } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    title?: string;
    description?: string;
    /** Icon rendered above the title. */
    icon?: Component;
    class?: string;
  }>(),
  {
    multiple: false,
    disabled: false,
    title: "Drag and drop files here",
  },
);

const emit = defineEmits<{ files: [files: File[]] }>();

const inputId = useId();
const inputRef = ref<HTMLInputElement | null>(null);
const dragging = ref(false);
const iconComponent = computed(() => props.icon ?? CloudUpload);

function handleFiles(list: FileList | null) {
  if (!list || list.length === 0) return;
  emit("files", Array.from(list));
}

function openPicker() {
  if (!props.disabled) inputRef.value?.click();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openPicker();
  }
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

function onInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  handleFiles(input.files);
  input.value = "";
}
</script>

<template>
  <div data-slot="dropzone">
    <div
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled || undefined"
      :aria-label="title"
      :class="
        cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-10 text-center outline-none transition-colors hover:border-muted-foreground/50 hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          dragging && 'border-primary bg-primary/5',
          disabled && 'pointer-events-none opacity-50',
          props.class,
        )
      "
      @click="openPicker"
      @keydown="onKeydown"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <component
        :is="iconComponent"
        class="size-8 text-muted-foreground"
        aria-hidden="true"
      />
      <p class="text-sm font-medium">{{ title }}</p>
      <p v-if="description" class="text-xs text-muted-foreground">
        {{ description }}
      </p>
      <span
        class="text-sm font-medium text-primary underline underline-offset-4"
      >
        Browse files
      </span>
    </div>
    <input
      :id="inputId"
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      tabindex="-1"
      aria-hidden="true"
      class="sr-only"
      @change="onInputChange"
    />
  </div>
</template>
