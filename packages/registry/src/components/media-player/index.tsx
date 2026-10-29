import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { AudioPlayer } from "../audio-player/index";
import { VideoPlayer } from "../video-player/index";

interface MediaPlayerProps extends Omit<React.ComponentProps<"div">, "title"> {
  kind?: "video" | "audio";
  src: string;
  poster?: string;
  title?: React.ReactNode;
  artist?: React.ReactNode;
  caption?: React.ReactNode;
}

function MediaPlayer({
  className,
  kind = "video",
  src,
  poster,
  title,
  artist,
  caption,
  ...props
}: MediaPlayerProps) {
  return (
    <div data-slot="media-player" className={cn("w-full max-w-xl", className)} {...props}>
      {kind === "audio" ? (
        <AudioPlayer
          src={src}
          title={title}
          artist={artist}
          className="max-w-none"
        />
      ) : (
        <VideoPlayer src={src} poster={poster} caption={caption ?? title} />
      )}
    </div>
  );
}

export { MediaPlayer };
