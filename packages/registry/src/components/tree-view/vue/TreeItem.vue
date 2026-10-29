<script setup lang="ts">
import {
  ChevronRight,
  File,
  Folder,
  FolderOpen,
} from "lucide-vue-next";
import { ref } from "vue";

import { cn } from "@/lib/utils";

import type { TreeNode } from "./types";

const props = withDefaults(
  defineProps<{
    node: TreeNode;
    level: number;
    defaultExpanded?: string[];
  }>(),
  { defaultExpanded: () => [] },
);

const expanded = ref(props.defaultExpanded.includes(props.node.id));
const hasChildren = ref(Boolean(props.node.children?.length));
</script>

<template>
  <li
    role="treeitem"
    :aria-expanded="hasChildren ? expanded : undefined"
  >
    <button
      type="button"
      :class="
        cn(
          'flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors',
          hasChildren && 'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-2 focus-visible:ring-ring',
        )
      "
      :style="{ paddingLeft: `${level * 16 + 8}px` }"
      @click="hasChildren ? (expanded = !expanded) : undefined"
    >
      <ChevronRight
        v-if="hasChildren"
        :class="
          cn(
            'size-3.5 shrink-0 text-muted-foreground transition-transform',
            expanded && 'rotate-90',
          )
        "
        aria-hidden="true"
      />
      <span v-else class="size-3.5 shrink-0" aria-hidden="true" />

      <FolderOpen
        v-if="hasChildren && expanded"
        class="size-4 shrink-0 text-amber-500"
        aria-hidden="true"
      />
      <Folder
        v-else-if="hasChildren"
        class="size-4 shrink-0 text-amber-500"
        aria-hidden="true"
      />
      <File
        v-else
        class="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />

      <span class="truncate">{{ node.label }}</span>
    </button>

    <ul v-if="hasChildren && expanded" role="group" class="grid">
      <TreeItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :default-expanded="defaultExpanded"
      />
    </ul>
  </li>
</template>
