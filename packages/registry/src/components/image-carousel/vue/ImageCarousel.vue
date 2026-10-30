<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselItem {
  src: string;
  alt: string;
  caption?: string;
}

const props = withDefaults(
  defineProps<{
    images: ImageCarouselItem[];
    class?: string;
    label?: string;
  }>(),
  { label: "Image carousel" },
);
</script>

<template>
  <Carousel :class="props.class" :label="label">
    <CarouselContent>
      <CarouselItem v-for="image in images" :key="image.src">
        <figure>
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            class="aspect-video w-full rounded-lg object-cover"
          />
          <figcaption
            v-if="image.caption"
            class="mt-2 text-center text-xs text-muted-foreground"
          >
            {{ image.caption }}
          </figcaption>
        </figure>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
