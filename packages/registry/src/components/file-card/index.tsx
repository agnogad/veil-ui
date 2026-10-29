import {
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardContent } from "../card/index";

type FileKind = "pdf" | "image" | "sheet" | "archive" | "text" | "other";

interface FileCardProps extends React.ComponentProps<"div"> {
  name: string;
  size?: string;
  kind?: FileKind;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const kindIcon: Record<FileKind, React.ElementType> = {
  pdf: FileText,
  image: FileImage,
  sheet: FileSpreadsheet,
  archive: FileArchive,
  text: FileText,
  other: File,
};

const kindColor: Record<FileKind, string> = {
  pdf: "text-red-600 bg-red-500/10 dark:text-red-400",
  image: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
  sheet: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  archive: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
  text: "text-sky-600 bg-sky-500/10 dark:text-sky-400",
  other: "text-muted-foreground bg-muted",
};

function FileCard({
  className,
  name,
  size,
  kind = "other",
  description,
  actions,
  ...props
}: FileCardProps) {
  const Icon = kindIcon[kind];

  return (
    <Card data-slot="file-card" className={cn("max-w-sm gap-3", className)} {...props}>
      <CardContent className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            kindColor[kind],
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">
            {size ? <span>{size} · </span> : null}
            {kind.toUpperCase()}
          </p>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-1">{actions}</div> : null}
      </CardContent>
    </Card>
  );
}

export { FileCard, type FileKind };
