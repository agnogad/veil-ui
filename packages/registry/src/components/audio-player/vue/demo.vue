<script setup lang="ts">
import { AudioPlayer } from "./index";

const sample =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
</script>

<template>
  <div class="grid gap-4">
    <AudioPlayer :src="sample" title="Product walkthrough" artist="Veil team" />
    <AudioPlayer :src="sample" class="max-w-xs" />
  </div>
</template>
