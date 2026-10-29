<script setup lang="ts">
import type { TreeNode } from "./index";
import { TreeView } from "./index";

const files: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "button.tsx" },
          { id: "card", label: "card.tsx" },
        ],
      },
      { id: "app", label: "app.tsx" },
    ],
  },
  { id: "package", label: "package.json" },
  { id: "readme", label: "README.md" },
];
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <TreeView :data="files" :default-expanded="['src']" />
    <TreeView :data="files" label="Project files (collapsed)" />
  </div>
</template>
