<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./index";

const slides = [
  {
    title: "Design tokens",
    body: "A single source of truth for color, spacing and type.",
  },
  {
    title: "Registry",
    body: "Copy-paste components that live in your codebase.",
  },
  {
    title: "CLI",
    body: "Add any component with a single command.",
  },
];
</script>

<template>
  <Carousel class="mx-auto w-full max-w-md" label="Product features">
    <CarouselContent>
      <CarouselItem v-for="slide in slides" :key="slide.title">
        <div class="flex h-44 flex-col justify-end rounded-lg border bg-muted/30 p-6">
          <p class="text-sm font-semibold">{{ slide.title }}</p>
          <p class="mt-1 text-sm text-muted-foreground">{{ slide.body }}</p>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
