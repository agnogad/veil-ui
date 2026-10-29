import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface ProductDemoProps extends Omit<React.ComponentProps<"figure">, "title"> {
  title?: React.ReactNode;
  url?: string;
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
  children?: React.ReactNode;
}

function ProductDemo({
  className,
  title,
  url = "app.veil-ui.dev",
  src,
  alt = "",
  caption,
  children,
  ...props
}: ProductDemoProps) {
  return (
    <figure
      data-slot="product-demo"
      className={cn(
        "overflow-hidden rounded-xl border bg-background shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
        </span>
        <span className="mx-auto flex max-w-xs flex-1 items-center justify-center rounded-md border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
          {title ?? url}
        </span>
      </div>
      <div className="aspect-[16/9] w-full bg-muted/20">
        {src ? (
          <img src={src} alt={alt} className="size-full object-cover" />
        ) : (
          children
        )}
      </div>
      {caption ? (
        <figcaption className="border-t px-4 py-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { ProductDemo };
export type { ProductDemoProps };
