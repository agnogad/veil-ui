<script setup lang="ts">
import { ImageIcon } from "lucide-vue-next";

import { AspectRatio } from "./index";
</script>

<template>
  <AspectRatio class="max-w-md rounded-lg border">
    <div
      class="flex size-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground"
    >
      <ImageIcon class="size-5" aria-hidden="true" />
      <span class="text-sm">16 / 9</span>
    </div>
  </AspectRatio>

  <div class="mt-4 flex flex-wrap items-start gap-4">
    <AspectRatio :ratio="1" class="w-40 rounded-lg border">
      <div
        class="flex size-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground"
      >
        <ImageIcon class="size-5" aria-hidden="true" />
        <span class="text-sm">1 / 1</span>
      </div>
    </AspectRatio>

    <AspectRatio :ratio="3 / 4" class="w-32 rounded-lg border">
      <div
        class="flex size-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground"
      >
        <ImageIcon class="size-5" aria-hidden="true" />
        <span class="text-sm">3 / 4</span>
      </div>
    </AspectRatio>
  </div>
</template>
