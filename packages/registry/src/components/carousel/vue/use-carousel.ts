import { inject, provide, ref, type InjectionKey, type Ref } from "vue";

export interface CarouselContext {
  track: Ref<HTMLElement | null>;
  index: Ref<number>;
  count: Ref<number>;
  orientation: Ref<"horizontal" | "vertical">;
  canPrev: Ref<boolean>;
  canNext: Ref<boolean>;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  sync: () => void;
}

export const carouselKey: InjectionKey<CarouselContext> = Symbol("carousel");

export function provideCarousel(context: CarouselContext) {
  provide(carouselKey, context);
}

export function useCarousel(): CarouselContext {
  const context = inject(carouselKey);
  if (!context) throw new Error("useCarousel must be used within a Carousel");
  return context;
}

export function createCarouselContext() {
  return {
    track: ref<HTMLElement | null>(null),
    index: ref(0),
    count: ref(0),
    orientation: ref<"horizontal" | "vertical">("horizontal"),
    canPrev: ref(false),
    canNext: ref(false),
  };
}
