<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { DateRangePicker, type DateRange } from "./index";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

const presets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

const range = ref<DateRange | undefined>();
const presetRange = ref<DateRange | undefined>({
  from: startOfMonth(new Date()),
  to: new Date(),
});
const singleRange = ref<DateRange | undefined>();

function applyPreset(days: number) {
  const to = new Date();
  presetRange.value = { from: addDays(to, -days), to };
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <DateRangePicker v-model="range" />

    <div class="flex flex-col gap-3">
      <DateRangePicker v-model="presetRange" />
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="preset in presets"
          :key="preset.label"
          type="button"
          variant="outline"
          size="sm"
          @click="applyPreset(preset.days)"
        >
          {{ preset.label }}
        </Button>
      </div>
    </div>

    <DateRangePicker
      v-model="singleRange"
      label="Billing period"
      :number-of-months="1"
    />
  </div>
</template>
