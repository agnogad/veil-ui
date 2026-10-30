<script setup lang="ts">
import { computed, ref } from "vue";

import { Calendar } from "./index";
import type { CalendarRange } from "./types";

const date = ref<Date | undefined>(new Date());
const range = ref<CalendarRange | undefined>({
  from: new Date(),
  to: new Date(new Date().setDate(new Date().getDate() + 5)),
});

const formatted = computed(() =>
  date.value
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(date.value)
    : "No date selected",
);

const today = new Date();
</script>

<template>
  <div class="grid gap-6">
    <div class="flex flex-col gap-3">
      <Calendar v-model:selected="date" mode="single" />
      <p class="text-sm text-muted-foreground">{{ formatted }}</p>
    </div>
    <Calendar v-model:selected="range" mode="range" />
    <Calendar
      mode="single"
      caption-layout="dropdown"
      :start-month="new Date(2020, 0)"
      :end-month="new Date(2030, 11)"
    />
    <Calendar
      mode="single"
      :default-month="today"
      :disabled="{ before: today, dayOfWeek: [0, 6] }"
    />
  </div>
</template>
