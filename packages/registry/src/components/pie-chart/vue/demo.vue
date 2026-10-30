<script setup lang="ts">
import { PieChart } from "./index";

const channels = [
  { name: "Organic", value: 4200 },
  { name: "Referral", value: 2600 },
  { name: "Paid", value: 1800 },
  { name: "Social", value: 1400 },
];
</script>

<template>
  <div class="grid gap-4">
    <PieChart :data="channels" class="max-w-md" />
    <PieChart :data="channels" show-labels class="max-w-md" />
  </div>
</template>
