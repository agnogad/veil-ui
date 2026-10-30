<script setup lang="ts">
import { ImageGallery } from "./index";

const images = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60",
    alt: "Mountain lake",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=60",
    alt: "Forest trail",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=60",
    alt: "Open field",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60",
    alt: "Mountain valley",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=60",
    alt: "Lake and hills",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=60",
    alt: "Foggy forest",
  },
];
</script>

<template>
  <ImageGallery :images="images" class="mx-auto max-w-2xl" />
</template>
