<script setup lang="ts">
import { Upload } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    accept?: string;
    multiple?: boolean;
    onFiles?: (files: FileList) => void;
    label?: string;
    class?: string;
  }>(),
  { label: "Upload" },
);

const inputRef = ref<HTMLInputElement | null>(null);

function openPicker() {
  inputRef.value?.click();
}

function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  if (files && files.length > 0) props.onFiles?.(files);
  input.value = "";
}
</script>

<template>
  <input
    ref="inputRef"
    type="file"
    :accept="accept"
    :multiple="multiple"
    aria-hidden="true"
    tabindex="-1"
    class="sr-only"
    @change="handleChange"
  />
  <Button
    data-slot="upload-button"
    v-bind="$attrs"
    :class="props.class"
    @click="openPicker"
  >
    <Upload aria-hidden="true" />
    <slot>{{ label }}</slot>
  </Button>
</template>
