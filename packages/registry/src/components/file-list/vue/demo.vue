<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { FileList, type FileListItem } from "./index";

const items = ref<FileListItem[]>([
  { id: "1", name: "brand-guide.pdf", size: "4.2 MB", kind: "pdf" },
  { id: "2", name: "hero.png", size: "860 KB", kind: "image" },
  { id: "3", name: "budget.xlsx", size: "120 KB", kind: "sheet" },
  { id: "4", name: "assets.zip", size: "18 MB", kind: "archive" },
]);

function remove(item: FileListItem) {
  items.value = items.value.filter((entry) => entry.id !== item.id);
}
</script>

<template>
  <div class="grid max-w-md gap-4">
    <FileList
      label="Project files"
      :items="items"
      @remove="remove"
    >
      <template #action="{ item }">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          :aria-label="`Remove ${item.name}`"
          @click="remove(item)"
        >
          <Trash2 class="size-4" aria-hidden />
        </Button>
      </template>
    </FileList>

    <FileList
      label="Downloads"
      :items="[
        { id: 'a', name: 'release-notes.md', size: '12 KB', kind: 'text', url: '#' },
        { id: 'b', name: 'logo.svg', size: '8 KB', kind: 'image', url: '#' },
      ]"
    />
  </div>
</template>
