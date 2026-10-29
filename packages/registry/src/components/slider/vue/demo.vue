<script setup lang="ts">
import { ref } from "vue";

import { Slider } from "./index";

const volume = ref([40]);
</script>

<template>
  <div class="grid gap-6">
    <div class="grid w-full max-w-sm gap-3">
      <Slider
        v-model="volume"
        :max="100"
        :step="1"
        aria-label="Volume"
      />
      <p class="text-sm text-muted-foreground">Volume: {{ volume[0] }}</p>
    </div>

    <Slider
      :default-value="[50]"
      :max="100"
      :step="10"
      aria-label="Opacity"
      class="max-w-sm"
    />

    <Slider
      :default-value="[30]"
      disabled
      aria-label="Disabled slider"
      class="max-w-sm"
    />
  </div>
</template>
