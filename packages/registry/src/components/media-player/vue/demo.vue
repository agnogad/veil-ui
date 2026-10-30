<script setup lang="ts">
import { MediaPlayer } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <MediaPlayer
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=60"
      title="Spring in motion"
    />
    <MediaPlayer
      kind="audio"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
      title="Release notes"
      artist="Veil team"
    />
  </div>
</template>
