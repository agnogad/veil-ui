"use client";
import { Play } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface VideoThumbnailProps extends React.ComponentProps<"button"> {
  src: string;
  alt?: string;
  title: string;
  duration?: string;
}

function VideoThumbnail({
  className,
  src,
  alt = "",
  title,
  duration,
  onClick,
  ...props
}: VideoThumbnailProps) {
  return (
    <button
      type="button"
      data-slot="video-thumbnail"
      aria-label={`Play ${title}`}
      onClick={onClick}
      className={cn(
        "group relative block w-full max-w-xs overflow-hidden rounded-lg border text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt || title}
        loading="lazy"
        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
        <span className="flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow">
          <Play className="ml-0.5 size-5" aria-hidden />
        </span>
      </span>
      {duration ? (
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
      ) : null}
      <span className="block truncate px-3 py-2 text-sm font-medium">{title}</span>
    </button>
  );
}

export { VideoThumbnail };
