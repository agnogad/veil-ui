import {
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card } from "../card/index";

type FileListKind = "pdf" | "image" | "sheet" | "archive" | "text" | "other";

interface FileListItem {
  id: string;
  name: string;
  size?: string;
  kind?: FileListKind;
  url?: string;
  action?: React.ReactNode;
}

interface FileListProps extends React.ComponentProps<"ul"> {
  items: FileListItem[];
  label?: string;
}

const kindIcon: Record<FileListKind, React.ElementType> = {
  pdf: FileText,
  image: FileImage,
  sheet: FileSpreadsheet,
  archive: FileArchive,
  text: FileText,
  other: File,
};

function FileList({ className, items, label = "Files", ...props }: FileListProps) {
  return (
    <Card className="overflow-hidden py-0">
      <ul
        data-slot="file-list"
        aria-label={label}
        className={cn("divide-y", className)}
        {...props}
      >
        {items.map((item) => {
          const Icon = kindIcon[item.kind ?? "other"];
          return (
            <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0 flex-1">
                {item.url ? (
                  <a
                    href={item.url}
                    className="block truncate text-sm font-medium hover:underline"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                )}
                {item.size ? (
                  <span className="text-xs text-muted-foreground">{item.size}</span>
                ) : null}
              </div>
              {item.action}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export { FileList, type FileListItem, type FileListKind };
