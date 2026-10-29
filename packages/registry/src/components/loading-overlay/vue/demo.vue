<script setup lang="ts">
import { LoadingOverlay } from "./index";
</script>

<template>
  <div class="relative h-40 overflow-hidden rounded-lg border p-4">
    <p class="text-sm text-muted-foreground">Recent activity</p>
    <LoadingOverlay label="Syncing records" />
  </div>
</template>
