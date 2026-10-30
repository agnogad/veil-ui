<script setup lang="ts">
import { VideoPlayer } from "./index";

const sample =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
</script>

<template>
  <div class="grid gap-4">
    <VideoPlayer
      :src="sample"
      poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=60"
      caption="A short clip of flowers in the wind."
    />
    <VideoPlayer
      :src="sample"
      muted
      autoplay
      loop
      caption="Muted looping background clip."
      class="max-w-sm"
    />
  </div>
</template>
