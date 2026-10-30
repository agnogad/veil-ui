<script setup lang="ts">
import { ImageCard } from "./index";
</script>

<template>
  <ImageCard
    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
    alt="Snowy mountain ridge at dusk"
    title="Winter collection"
    description="Quiet landscapes for focused work."
    class="mx-auto max-w-sm"
  >
    <p class="text-sm text-muted-foreground">Updated weekly.</p>
    <template #footer>Photo by Veil Studio</template>
  </ImageCard>
</template>
