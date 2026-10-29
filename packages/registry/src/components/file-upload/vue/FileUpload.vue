<script setup lang="ts">
import { FileText, X } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    accept?: string;
    multiple?: boolean;
    /** Maximum size per file in bytes. */
    maxSize?: number;
    /** Maximum number of files kept in the list. */
    maxFiles?: number;
    disabled?: boolean;
    /** Heading inside the dropzone. */
    label?: string;
    class?: string;
  }>(),
  {
    multiple: true,
    disabled: false,
    label: "Drag and drop files here",
  },
);

const emit = defineEmits<{
  upload: [files: File[]];
  filesChange: [files: File[]];
}>();

const files = ref<File[]>([]);
const error = ref<string | null>(null);

const description = computed(() =>
  [
    props.maxSize ? `Max ${formatBytes(props.maxSize)} per file` : null,
    props.maxFiles ? `up to ${props.maxFiles} files` : null,
  ]
    .filter(Boolean)
    .join(" · "),
);

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function update(next: File[]) {
  files.value = next;
  emit("filesChange", next);
}

function addFiles(incoming: File[]) {
  error.value = null;
  const accepted = props.maxSize
    ? incoming.filter((file) => file.size <= props.maxSize!)
    : incoming;

  if (accepted.length < incoming.length) {
    error.value = `Some files were skipped. Each file must be ${formatBytes(
      props.maxSize ?? 0,
    )} or smaller.`;
  }

  const merged = [...files.value];
  for (const file of accepted) {
    const exists = merged.some(
      (item) =>
        item.name === file.name &&
        item.size === file.size &&
        item.lastModified === file.lastModified,
    );
    if (!exists) merged.push(file);
  }

  const limited =
    props.maxFiles !== undefined ? merged.slice(0, props.maxFiles) : merged;

  if (props.maxFiles !== undefined && merged.length > props.maxFiles) {
    error.value = `Only the first ${props.maxFiles} files are kept.`;
  }

  update(limited);
}

function remove(file: File) {
  error.value = null;
  update(files.value.filter((item) => item !== file));
}

function upload() {
  emit("upload", files.value);
}
</script>

<template>
  <div
    data-slot="file-upload"
    :class="cn('flex flex-col gap-3', props.class)"
  >
    <Dropzone
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :title="label"
      :description="description || undefined"
      @files="addFiles"
    />

    <p v-if="error" role="alert" class="text-sm text-destructive">
      {{ error }}
    </p>

    <ul v-if="files.length > 0" class="flex flex-col gap-2">
      <li
        v-for="file in files"
        :key="`${file.name}-${file.size}-${file.lastModified}`"
        class="flex items-center gap-3 rounded-md border px-3 py-2"
      >
        <FileText class="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ file.name }}</p>
          <p class="text-xs text-muted-foreground">
            {{ formatBytes(file.size) }}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          :aria-label="`Remove ${file.name}`"
          :disabled="disabled"
          @click="remove(file)"
        >
          <X aria-hidden />
        </Button>
      </li>
    </ul>

    <div
      v-if="files.length > 0"
      class="flex items-center justify-between gap-3"
    >
      <p class="text-sm text-muted-foreground">
        {{ files.length }} file{{ files.length === 1 ? "" : "s" }} ready
      </p>
      <Button type="button" :disabled="disabled" @click="upload">
        Upload {{ files.length }} file{{ files.length === 1 ? "" : "s" }}
      </Button>
    </div>
  </div>
</template>
