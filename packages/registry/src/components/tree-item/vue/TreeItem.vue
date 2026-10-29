<script setup lang="ts">
import { TreeItem as BaseTreeItem } from "@/components/ui/tree-view";
import type { TreeNode } from "@/components/ui/tree-view";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    node: TreeNode;
    level: number;
    defaultExpanded?: string[];
    class?: string;
  }>(),
  { defaultExpanded: () => [] },
);
</script>

<template>
  <BaseTreeItem
    :node="node"
    :level="level"
    :default-expanded="defaultExpanded"
    :class="cn(props.class)"
  />
</template>
