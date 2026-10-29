<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { Lightbox } from "./index";
import type { LightboxImage } from "./types";

function placeholder(label: string, from: string, to: string): LightboxImage {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="48" text-anchor="middle">${label}</text></svg>`;
  return {
    src: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    alt: `${label} placeholder`,
  };
}

const images = [
  placeholder("Sunrise", "#f97316", "#f43f5e"),
  placeholder("Ocean", "#0ea5e9", "#6366f1"),
  placeholder("Forest", "#22c55e", "#0f766e"),
];

const open = ref(false);
const index = ref(1);
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button @click="open = true">Open at image 2</Button>
    <p class="text-sm text-muted-foreground">
      Image {{ index + 1 }} of {{ images.length }}
    </p>
    <Lightbox
      v-model:open="open"
      v-model:index="index"
      :images="images"
    />
  </div>
</template>
