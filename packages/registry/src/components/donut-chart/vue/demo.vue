<script setup lang="ts">
import { DonutChart } from "./index";

const storage = [
  { name: "Documents", value: 38 },
  { name: "Images", value: 27 },
  { name: "Video", value: 21 },
  { name: "Other", value: 14 },
];
</script>

<template>
  <div class="grid gap-4">
    <DonutChart :data="storage" class="max-w-md" />
    <DonutChart
      :data="storage"
      inner-radius="75%"
      :height="240"
      class="max-w-sm"
    />
  </div>
</template>
