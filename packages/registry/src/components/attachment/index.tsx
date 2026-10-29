"use client";

import { FileText, X } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface AttachmentProps extends React.ComponentProps<"div"> {
  name: string;
  size?: string;
  url?: string;
  onRemove?: () => void;
}

function Attachment({
  className,
  name,
  size,
  url,
  onRemove,
  ...props
}: AttachmentProps) {
  return (
    <div
      data-slot="attachment"
      className={cn(
        "inline-flex max-w-xs items-center gap-2 rounded-md border bg-card px-2.5 py-1.5 text-xs",
        className,
      )}
      {...props}
    >
      <FileText className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      {url ? (
        <a href={url} className="truncate font-medium hover:underline">
          {name}
        </a>
      ) : (
        <span className="truncate font-medium">{name}</span>
      )}
      {size ? <span className="shrink-0 text-muted-foreground">{size}</span> : null}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="ml-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-3" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

export { Attachment };
