"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { CarouselItem } from "../carousel-item/index";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel");
  }
  return context;
}

interface CarouselProps extends React.ComponentProps<"div"> {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

function Carousel({
  opts,
  orientation = "horizontal",
  setApi,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "vertical" ? "y" : "x",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((emblaApi: NonNullable<CarouselApi>) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    setApi?.(api);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect, setApi]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        className={cn("relative", className)}
        onKeyDown={(event) => {
          if (orientation === "horizontal") {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollPrev();
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollNext();
            }
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            scrollNext();
          }
        }}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        data-slot="carousel-content"
        className={cn(
          "flex",
          orientation === "vertical" ? "-mt-4 flex-col" : "-ml-4",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Previous slide"
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowLeft aria-hidden />
    </Button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Next slide"
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowRight aria-hidden />
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  type CarouselApi,
};
