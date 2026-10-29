<script setup lang="ts">
import { ref } from "vue";

import { MultiSelect } from "./index";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
];

const selected = ref<string[]>(["design"]);
const uncontrolled = ref<string[]>([]);
</script>

<template>
  <div class="grid gap-6">
    <div class="grid w-full max-w-xs gap-2">
      <MultiSelect
        v-model="selected"
        :options="options"
        placeholder="Choose teams"
        label="Teams"
      />
      <p class="text-sm text-muted-foreground">
        Selected: {{ selected.length === 0 ? "none" : selected.join(", ") }}
      </p>
    </div>

    <MultiSelect
      v-model="uncontrolled"
      :options="options"
      placeholder="Filter and pick several"
      label="Teams (filterable)"
      class="max-w-xs"
    />
  </div>
</template>
