<script setup lang="ts">
import { ref } from "vue";

import { DatePicker } from "./index";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

const formatLong = (date: Date) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(date);

const date = ref<Date | undefined>(new Date());
const today = new Date();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <DatePicker v-model="date" />
      <p class="text-sm text-muted-foreground">
        {{ date ? formatLong(date) : "No date selected" }}
      </p>
    </div>

    <DatePicker
      :model-value="addDays(new Date(), 7)"
      label="Delivery date"
    />

    <DatePicker
      label="Appointment date"
      placeholder="Appointments open next week"
      :from-date="addDays(today, 7)"
      :to-date="addDays(today, 30)"
    />
  </div>
</template>
