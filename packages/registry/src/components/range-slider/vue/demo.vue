<script setup lang="ts">
import { ref } from "vue";

import { RangeSlider } from "./index";

const range = ref([20, 80]);
const budget = ref([20, 60]);
</script>

<template>
  <div class="grid gap-6">
    <div class="grid w-full max-w-sm gap-3">
      <RangeSlider
        v-model="range"
        :max="100"
        :step="5"
        aria-label="Price range"
      />
      <p class="text-sm text-muted-foreground">{{ range[0] }} – {{ range[1] }}</p>
    </div>

    <div class="grid w-full max-w-sm gap-2">
      <RangeSlider
        v-model="budget"
        :min="0"
        :max="100"
        :step="20"
        aria-label="Budget range"
      />
      <div class="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>Selected ${{ budget[0] }}–${{ budget[1] }}</span>
        <span>$100+</span>
      </div>
    </div>
  </div>
</template>
