<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";

import { NumberInput } from "./index";

const seats = ref(3);
</script>

<template>
  <div class="grid gap-6">
    <NumberInput
      :default-value="2"
      aria-label="Quantity"
      class="max-w-40"
    />

    <div class="grid w-full max-w-60 gap-1.5">
      <Label for="seats">Seats</Label>
      <NumberInput
        id="seats"
        v-model="seats"
        :min="1"
        :max="50"
      />
      <p class="text-sm text-muted-foreground">
        {{ seats }} {{ seats === 1 ? "seat" : "seats" }} selected
      </p>
    </div>

    <div class="flex items-center gap-3">
      <NumberInput
        :default-value="5"
        :min="0"
        :max="10"
        aria-label="Retries"
        class="max-w-36"
      />
      <span class="text-sm text-muted-foreground">of 10 retries</span>
    </div>

    <NumberInput
      disabled
      :default-value="12"
      aria-label="Quantity"
      class="max-w-40"
    />
  </div>
</template>
