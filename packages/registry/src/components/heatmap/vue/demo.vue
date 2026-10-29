<script setup lang="ts">
import { Heatmap } from "./index";

const data = [
  [2, 4, 6, 8, 5, 3, 1],
  [3, 6, 9, 12, 8, 4, 2],
  [1, 3, 5, 7, 9, 6, 2],
  [4, 7, 10, 14, 11, 6, 3],
];
const rows = ["Mon", "Tue", "Wed", "Thu"];
const columns = ["00", "04", "08", "12", "16", "20", "24"];
</script>

<template>
  <div class="grid max-w-xl gap-8">
    <Heatmap
      :data="data"
      :rows="rows"
      :columns="columns"
      label="Requests by hour"
    />
    <Heatmap
      :data="data"
      :rows="rows"
      :columns="columns"
      :max="20"
      label="Requests by hour, scaled to 20"
    />
  </div>
</template>
