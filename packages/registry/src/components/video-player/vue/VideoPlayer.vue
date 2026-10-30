<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    src: string;
    poster?: string;
    caption?: string;
    videoClassName?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    class?: string;
  }>(),
  { controls: true },
);
</script>

<template>
  <figure data-slot="video-player" :class="cn('w-full max-w-xl', props.class)">
    <video
      :src="src"
      :poster="poster"
      :controls="controls"
      :autoplay="autoPlay"
      :muted="muted"
      :loop="loop"
      playsinline
      preload="metadata"
      :aria-label="caption ?? 'Video'"
      :class="
        cn(
          'aspect-video w-full rounded-lg border bg-black object-contain',
          videoClassName,
        )
      "
    />
    <figcaption v-if="caption" class="mt-2 text-xs text-muted-foreground">
      {{ caption }}
    </figcaption>
  </figure>
</template>
