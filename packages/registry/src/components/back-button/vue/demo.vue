<script setup lang="ts">
import { BackButton } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <BackButton fallback-href="#top" />
    <BackButton
      variant="outline"
      label="Back to list"
      fallback-href="#list"
    />
  </div>
</template>
