<script setup lang="ts">
import { ref } from "vue";

import { FilePreview } from "./index";

const showDraft = ref(true);

const imageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%233b82f6'/%3E%3Cstop offset='1' stop-color='%238b5cf6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='360' fill='url(%23g)'/%3E%3Ccircle cx='520' cy='90' r='56' fill='%23ffffff' opacity='.25'/%3E%3Cpath d='M0 280 L180 170 L320 260 L470 140 L640 250 V360 H0 Z' fill='%23ffffff' opacity='.2'/%3E%3C/svg%3E";
</script>

<template>
  <div class="grid max-w-md gap-4">
    <FilePreview
      name="release-notes.md"
      size="12 KB"
      type="text/markdown"
      text="# Release 2.4&#10;&#10;- Added data table sorting&#10;- Improved focus rings"
    />
    <FilePreview
      name="hero-banner.png"
      size="860 KB"
      type="image/png"
      :url="imageUrl"
    />
    <FilePreview name="contract.pdf" size="640 KB" type="application/pdf" />
    <FilePreview
      v-if="showDraft"
      name="draft.txt"
      size="2 KB"
      type="text/plain"
      text="Notes from the kickoff call."
      removable
      @remove="showDraft = false"
    />
  </div>
</template>
