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
