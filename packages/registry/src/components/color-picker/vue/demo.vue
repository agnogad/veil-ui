<script setup lang="ts">
import { ref } from "vue";

import { ColorPicker } from "./index";

const color = ref("#3b82f6");
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <ColorPicker v-model="color" />
      <p class="text-sm text-muted-foreground">Accent: {{ color }}</p>
    </div>

    <ColorPicker
      label="Brand color"
      default-value="#22c55e"
      :presets="['#0f172a', '#14b8a6', '#22c55e', '#f59e0b', '#e11d48']"
    />

    <ColorPicker disabled default-value="#64748b" label="Locked color" />
  </div>
</template>
