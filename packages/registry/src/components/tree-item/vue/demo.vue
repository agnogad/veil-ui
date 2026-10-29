<script setup lang="ts">
import type { TreeNode } from "@/components/ui/tree-view";
import { TreeView } from "@/components/ui/tree-view";

const project: TreeNode = {
  id: "app",
  label: "app",
  children: [
    {
      id: "components",
      label: "components",
      children: [
        { id: "button", label: "button.tsx" },
        { id: "card", label: "card.tsx" },
      ],
    },
    {
      id: "lib",
      label: "lib",
      children: [{ id: "utils", label: "utils.ts" }],
    },
    { id: "page", label: "page.tsx" },
  ],
};
</script>

<template>
  <TreeView
    label="Project files"
    :data="[project]"
    :default-expanded="['app', 'components']"
  />
</template>
