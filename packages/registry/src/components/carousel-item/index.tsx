import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface CarouselItemProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
}

function CarouselItem({
  className,
  orientation = "horizontal",
  ...props
}: CarouselItemProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "vertical" ? "pt-4" : "pl-4",
        className,
      )}
      {...props}
    />
  );
}

export { CarouselItem, type CarouselItemProps };
