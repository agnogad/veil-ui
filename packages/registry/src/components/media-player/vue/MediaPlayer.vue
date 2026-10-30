<script setup lang="ts">
import { cn } from "@/lib/utils";

import { AudioPlayer } from "@/components/ui/audio-player";
import { VideoPlayer } from "@/components/ui/video-player";

const props = withDefaults(
  defineProps<{
    kind?: "video" | "audio";
    src: string;
    poster?: string;
    title?: string;
    artist?: string;
    caption?: string;
    class?: string;
  }>(),
  { kind: "video" },
);
</script>

<template>
  <div data-slot="media-player" :class="cn('w-full max-w-xl', props.class)">
    <AudioPlayer
      v-if="kind === 'audio'"
      :src="src"
      :title="title"
      :artist="artist"
      class="max-w-none"
    />
    <VideoPlayer
      v-else
      :src="src"
      :poster="poster"
      :caption="caption ?? title"
    />
  </div>
</template>
