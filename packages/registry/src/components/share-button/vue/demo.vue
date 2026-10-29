<script setup lang="ts">
import { ShareButton } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ShareButton />
    <ShareButton
      url="https://veil-ui.dev"
      title="Veil UI"
      text="Copy-paste components for React"
    />
    <ShareButton variant="outline" label="Share this page" />
  </div>
</template>
