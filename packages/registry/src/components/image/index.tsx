import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface ImageProps extends React.ComponentProps<"img"> {
  ratio?: "auto" | "square" | "video" | "wide";
}

const ratioClass = {
  auto: "",
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[3/1]",
};

function Image({ className, ratio = "auto", alt, ...props }: ImageProps) {
  return (
    <img
      data-slot="image"
      alt={alt}
      className={cn(
        "max-w-full rounded-lg object-cover",
        ratioClass[ratio],
        className,
      )}
      {...props}
    />
  );
}

export { Image };
