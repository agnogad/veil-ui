import { Download, FileText, ImageOff } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardContent, CardHeader, CardTitle } from "../card/index";

interface FilePreviewProps extends Omit<React.ComponentProps<"div">, "title"> {
  name: string;
  size?: string;
  type?: string;
  url?: string;
  text?: string;
}

function FilePreview({
  className,
  name,
  size,
  type = "",
  url,
  text,
  ...props
}: FilePreviewProps) {
  const isImage = type.startsWith("image/") && Boolean(url);
  const isText = text !== undefined;

  return (
    <Card data-slot="file-preview" className={cn("max-w-md overflow-hidden", className)} {...props}>
      <CardHeader className="gap-1">
        <CardTitle className="text-sm">{name}</CardTitle>
        <p className="text-xs text-muted-foreground">
          {size ? <span>{size} · </span> : null}
          {type || "Unknown type"}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {isImage ? (
          <img
            src={url}
            alt={name}
            className="max-h-64 w-full rounded-md border object-contain"
          />
        ) : isText ? (
          <pre className="max-h-48 overflow-auto rounded-md border bg-muted/40 p-3 text-xs whitespace-pre-wrap">
            {text}
          </pre>
        ) : (
          <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-muted/30 text-sm text-muted-foreground">
            {type.startsWith("image/") ? (
              <ImageOff className="size-5" aria-hidden />
            ) : (
              <FileText className="size-5" aria-hidden />
            )}
            <span>No preview available</span>
          </div>
        )}
        {url ? (
          <a
            href={url}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Download className="size-4" aria-hidden />
            Download
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { FilePreview };
