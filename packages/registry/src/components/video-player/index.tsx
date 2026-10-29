import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface VideoPlayerProps extends React.ComponentProps<"figure"> {
  src: string;
  poster?: string;
  caption?: React.ReactNode;
  videoClassName?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

function VideoPlayer({
  className,
  src,
  poster,
  caption,
  videoClassName,
  autoPlay,
  muted,
  loop,
  controls = true,
  ...props
}: VideoPlayerProps) {
  return (
    <figure
      data-slot="video-player"
      className={cn("w-full max-w-xl", className)}
      {...props}
    >
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        aria-label={typeof caption === "string" ? caption : "Video"}
        className={cn(
          "aspect-video w-full rounded-lg border bg-black object-contain",
          videoClassName,
        )}
      />
      {caption ? (
        <figcaption className="mt-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { VideoPlayer };
