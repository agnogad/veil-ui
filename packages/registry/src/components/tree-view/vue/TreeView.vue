<script setup lang="ts">
import { cn } from "@/lib/utils";

import TreeItem from "./TreeItem.vue";
import type { TreeNode } from "./types";

const props = withDefaults(
  defineProps<{
    data: TreeNode[];
    label?: string;
    defaultExpanded?: string[];
    class?: string;
  }>(),
  { label: "File tree", defaultExpanded: () => [] },
);
</script>

<template>
  <ul
    data-slot="tree-view"
    role="tree"
    :aria-label="label"
    :class="cn('w-full max-w-sm', props.class)"
  >
    <TreeItem
      v-for="node in props.data"
      :key="node.id"
      :node="node"
      :level="0"
      :default-expanded="defaultExpanded"
    />
  </ul>
</template>
