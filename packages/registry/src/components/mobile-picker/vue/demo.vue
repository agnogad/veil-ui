<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { MobilePicker } from "./index";

const timezones = [
  { value: "utc", label: "UTC", description: "Coordinated Universal Time" },
  { value: "berlin", label: "Berlin", description: "Central European Time" },
  { value: "new-york", label: "New York", description: "Eastern Time" },
  { value: "tokyo", label: "Tokyo", description: "Japan Standard Time" },
];

const open = ref(false);
const value = ref("utc");
</script>

<template>
  <div class="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border p-4">
    <div class="text-sm">
      <p class="font-medium">Timezone</p>
      <p class="text-xs text-muted-foreground">
        {{ timezones.find((zone) => zone.value === value)?.label }}
      </p>
    </div>
    <Button variant="outline" @click="open = true">Change</Button>
    <MobilePicker
      v-model:open="open"
      title="Select timezone"
      description="Used for schedules and reports."
      :options="timezones"
      :value="value"
      @select="value = $event"
    />
  </div>
</template>
