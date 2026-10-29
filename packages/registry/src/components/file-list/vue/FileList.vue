<script setup lang="ts">
import {
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  X,
} from "lucide-vue-next";
import type { Component } from "vue";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { FileListKind, FileListItem } from "./types";

const props = withDefaults(
  defineProps<{
    items: FileListItem[];
    label?: string;
    class?: string;
  }>(),
  { label: "Files" },
);

const emit = defineEmits<{ remove: [item: FileListItem] }>();

const kindIcon: Record<FileListKind, Component> = {
  pdf: FileText,
  image: FileImage,
  sheet: FileSpreadsheet,
  archive: FileArchive,
  text: FileText,
  other: File,
};
</script>

<template>
  <Card class="overflow-hidden py-0">
    <ul
      data-slot="file-list"
      :aria-label="label"
      :class="cn('divide-y', props.class)"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-center gap-3 px-4 py-2.5"
      >
        <component
          :is="kindIcon[item.kind ?? 'other']"
          class="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div class="min-w-0 flex-1">
          <a
            v-if="item.url"
            :href="item.url"
            class="block truncate text-sm font-medium hover:underline"
          >
            {{ item.name }}
          </a>
          <span v-else class="block truncate text-sm font-medium">
            {{ item.name }}
          </span>
          <span v-if="item.size" class="text-xs text-muted-foreground">
            {{ item.size }}
          </span>
        </div>
        <slot name="action" :item="item" :remove="() => emit('remove', item)">
          <button
            type="button"
            class="rounded-sm p-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            :aria-label="`Remove ${item.name}`"
            @click="emit('remove', item)"
          >
            <X class="size-4" aria-hidden="true" />
          </button>
        </slot>
      </li>
    </ul>
  </Card>
</template>
