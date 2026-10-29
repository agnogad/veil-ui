"use client";

import { ImageOff } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface ImageWithFallbackProps extends Omit<React.ComponentProps<"img">, "onError"> {
  fallback?: React.ReactNode;
  wrapperClassName?: string;
}

function ImageWithFallback({
  className,
  wrapperClassName,
  fallback,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        data-slot="image-fallback"
        className={cn(
          "flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 p-4 text-center text-sm text-muted-foreground",
          wrapperClassName,
        )}
      >
        {fallback ?? (
          <>
            <ImageOff className="size-5" aria-hidden />
            <span>{alt || "Image unavailable"}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <img
      data-slot="image"
      alt={alt}
      className={cn("max-w-full rounded-lg object-cover", className)}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}

export { ImageWithFallback };
