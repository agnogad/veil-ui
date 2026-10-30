<script setup lang="ts">
import { CarouselItem } from "./index";
</script>

<template>
  <div class="grid max-w-sm gap-4">
    <div class="flex overflow-hidden rounded-lg border bg-card">
      <CarouselItem>
        <div class="flex h-40 items-center justify-center p-6 text-sm text-muted-foreground">
          One slide of content
        </div>
      </CarouselItem>
    </div>
    <div class="flex overflow-hidden rounded-lg border bg-card">
      <CarouselItem
        v-for="label in ['Design', 'Engineering']"
        :key="label"
        class="basis-1/2 p-3"
      >
        <div class="flex h-32 items-center justify-center rounded-md border bg-muted/30 text-sm font-medium">
          {{ label }}
        </div>
      </CarouselItem>
    </div>
  </div>
</template>
