<script setup lang="ts">
import { ref } from "vue";

import { Autocomplete } from "./index";

const cities = [
  { value: "berlin", label: "Berlin" },
  { value: "istanbul", label: "Istanbul" },
  { value: "lisbon", label: "Lisbon" },
  { value: "tokyo", label: "Tokyo" },
];

const value = ref("");
const empty = ref("");
</script>

<template>
  <div class="grid gap-6">
    <div class="w-full max-w-xs">
      <Autocomplete
        :options="cities"
        aria-label="City"
        placeholder="Search cities…"
        default-value="lisbon"
      />
    </div>

    <div class="grid w-full max-w-xs gap-2">
      <Autocomplete
        v-model="value"
        :options="cities"
        aria-label="City"
        placeholder="Type to search…"
      />
      <p class="text-sm text-muted-foreground">
        Selected: {{ value || "none" }}
      </p>
    </div>

    <div class="w-full max-w-xs">
      <Autocomplete
        v-model="empty"
        :options="cities"
        aria-label="City"
        placeholder="Type “zzz” to see the empty state"
        empty-message="No cities match that search."
      />
    </div>
  </div>
</template>
