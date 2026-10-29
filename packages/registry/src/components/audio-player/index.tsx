import { Music } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface AudioPlayerProps extends Omit<React.ComponentProps<"figure">, "title"> {
  src: string;
  title?: React.ReactNode;
  artist?: React.ReactNode;
  audioClassName?: string;
}

function AudioPlayer({
  className,
  src,
  title,
  artist,
  audioClassName,
  ...props
}: AudioPlayerProps) {
  return (
    <figure
      data-slot="audio-player"
      className={cn(
        "flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Music className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 text-sm">
          <p className="truncate font-medium">{title ?? "Audio track"}</p>
          {artist ? (
            <p className="truncate text-xs text-muted-foreground">{artist}</p>
          ) : null}
        </div>
      </div>
      <audio
        src={src}
        controls
        preload="metadata"
        aria-label={typeof title === "string" ? title : "Audio track"}
        className={cn("w-full", audioClassName)}
      />
    </figure>
  );
}

export { AudioPlayer };
