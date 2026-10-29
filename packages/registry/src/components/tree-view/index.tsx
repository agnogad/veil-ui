"use client";

import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  defaultExpanded?: string[];
}

function TreeItem({ node, level, defaultExpanded = [] }: TreeItemProps) {
  const hasChildren = Boolean(node.children?.length);
  const [expanded, setExpanded] = useState(defaultExpanded.includes(node.id));

  return (
    <li role="treeitem" aria-expanded={hasChildren ? expanded : undefined}>
      <button
        type="button"
        onClick={hasChildren ? () => setExpanded((value) => !value) : undefined}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors",
          hasChildren && "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
            aria-hidden
          />
        ) : (
          <span className="size-3.5 shrink-0" aria-hidden />
        )}
        {hasChildren ? (
          expanded ? (
            <FolderOpen className="size-4 shrink-0 text-amber-500" aria-hidden />
          ) : (
            <Folder className="size-4 shrink-0 text-amber-500" aria-hidden />
          )
        ) : (
          <File className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        )}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && expanded ? (
        <ul role="group" className="grid">
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

interface TreeViewProps extends React.ComponentProps<"ul"> {
  data: TreeNode[];
  label?: string;
  defaultExpanded?: string[];
}

function TreeView({
  className,
  data,
  label = "File tree",
  defaultExpanded,
  ...props
}: TreeViewProps) {
  return (
    <ul
      data-slot="tree-view"
      role="tree"
      aria-label={label}
      className={cn("w-full max-w-sm", className)}
      {...props}
    >
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          level={0}
          defaultExpanded={defaultExpanded}
        />
      ))}
    </ul>
  );
}

export { TreeItem, TreeView, type TreeNode };
