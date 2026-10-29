<script setup lang="ts">
import { Image } from "./index";

const photo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%2393c5fd'/%3E%3Cstop offset='1' stop-color='%23c4b5fd'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ccircle cx='640' cy='120' r='64' fill='%23fff' fill-opacity='.8'/%3E%3Cpath d='M0 560 L220 280 L380 460 L520 320 L800 600 L0 600Z' fill='%231e293b' fill-opacity='.55'/%3E%3Cpath d='M0 600 L300 360 L520 520 L680 420 L800 500 L800 600Z' fill='%230f172a' fill-opacity='.5'/%3E%3C/svg%3E";
</script>

<template>
  <div class="grid gap-4">
    <Image :src="photo" alt="A lake below snowy mountains" class="w-80" />
    <Image
      :src="photo"
      alt="A lake below snowy mountains"
      ratio="video"
      class="w-full max-w-md"
    />
    <Image
      :src="photo"
      alt="A lake below snowy mountains"
      ratio="square"
      class="size-32"
    />
  </div>
</template>
