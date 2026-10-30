<script setup lang="ts">
import { ImageCarousel } from "./index";

const images = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60",
    alt: "Mountain lake at sunrise",
    caption: "Alpine lake, 6:04 am",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=60",
    alt: "Sunlight through a forest",
    caption: "Forest trail",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=60",
    alt: "Green field under clouds",
    caption: "Open field",
  },
];
</script>

<template>
  <ImageCarousel :images="images" class="mx-auto max-w-xl" />
</template>
