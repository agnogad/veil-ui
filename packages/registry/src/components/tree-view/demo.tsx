import { TreeView, type TreeNode } from "./index";

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

export function TreeViewBasic() {
  return <TreeView data={files} defaultExpanded={["src"]} />;
}

export function TreeViewCollapsed() {
  return <TreeView data={files} label="Project files" />;
}
