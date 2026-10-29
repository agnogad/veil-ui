import { TreeView, type TreeNode } from "../tree-view/index";

const node: TreeNode = {
  id: "root",
  label: "Project",
  children: [
    { id: "a", label: "index.tsx" },
    { id: "b", label: "styles.css" },
  ],
};

export function TreeItemBasic() {
  return <TreeView data={[{ ...node, id: "root" }]} defaultExpanded={["root"]} />;
}

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

export function TreeItemNested() {
  return (
    <TreeView
      label="Project files"
      data={[project]}
      defaultExpanded={["app", "components"]}
    />
  );
}
