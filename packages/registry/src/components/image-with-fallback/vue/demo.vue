<script setup lang="ts">
import { ImageWithFallback } from "./index";

const photo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23a7f3d0'/%3E%3Cstop offset='1' stop-color='%2393c5fd'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='450' fill='url(%23g)'/%3E%3Cpath d='M0 400 L160 180 L300 360 L420 220 L600 430 L600 450 L0 450Z' fill='%230f172a' fill-opacity='.45'/%3E%3C/svg%3E";
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <ImageWithFallback :src="photo" alt="A mountain valley" class="w-72" />

    <ImageWithFallback
      src="/images/team-offsite.jpg"
      alt="Team offsite"
      class="w-72"
      wrapper-class-name="w-72"
    />

    <ImageWithFallback
      src="/images/team-offsite.jpg"
      alt="Team offsite"
      class="w-72"
      wrapper-class-name="w-72"
    >
      <template #fallback>
        <span>Photo coming soon</span>
      </template>
    </ImageWithFallback>
  </div>
</template>
