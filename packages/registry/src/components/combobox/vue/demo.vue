<script setup lang="ts">
import { ref } from "vue";

import { Combobox } from "./index";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "vite", label: "Vite" },
];

const value = ref("next");
</script>

<template>
  <div class="grid gap-6">
    <div class="grid w-full max-w-xs gap-2">
      <Combobox
        v-model="value"
        :options="frameworks"
        placeholder="Select framework"
        label="Framework"
      />
      <p class="text-sm text-muted-foreground">Selected: {{ value }}</p>
    </div>

    <Combobox
      :options="frameworks"
      placeholder="Unavailable"
      label="Framework"
      disabled
      class="max-w-xs"
    />
  </div>
</template>
