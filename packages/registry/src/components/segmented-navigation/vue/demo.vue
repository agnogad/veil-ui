<script setup lang="ts">
import { ref } from "vue";

import { SegmentedNavigation, type SegmentedOption } from "./index";

const value = ref("day");

const options: SegmentedOption[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const disabledOptions: SegmentedOption[] = [
  { value: "day", label: "Day" },
  { value: "year", label: "Year", disabled: true },
];
</script>

<template>
  <div class="grid gap-4">
    <SegmentedNavigation v-model:value="value" :options="options" />
    <SegmentedNavigation value="day" :options="disabledOptions" />
    <p class="text-xs text-muted-foreground">Selected: {{ value }}</p>
  </div>
</template>
