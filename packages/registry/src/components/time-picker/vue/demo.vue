<script setup lang="ts">
import { ref } from "vue";

import { TimePicker } from "./index";

const time = ref<string | undefined>("09:30");
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <TimePicker v-model="time" />
      <p class="text-sm text-muted-foreground">
        {{ time ? `Selected: ${time}` : "No time selected" }}
      </p>
    </div>

    <TimePicker label="Meeting time" default-value="14:00" :minute-step="15" />
    <TimePicker disabled placeholder="Unavailable" />
  </div>
</template>
