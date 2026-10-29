<script setup lang="ts">
import { ref } from "vue";

import { CheckboxGroup } from "./index";

const options = [
  { value: "news", label: "Product news" },
  { value: "tips", label: "Tips and tricks" },
  { value: "billing", label: "Billing updates" },
];

const selected = ref<string[]>(["news"]);
</script>

<template>
  <div class="grid gap-6">
    <CheckboxGroup label="Email preferences" :options="options" />

    <CheckboxGroup
      label="Notifications"
      :options="[
        {
          value: 'comments',
          label: 'Comments',
          description: 'Replies to your threads.',
        },
        {
          value: 'mentions',
          label: 'Mentions',
          description: 'When someone @mentions you.',
        },
      ]"
    />

    <div class="grid gap-2">
      <CheckboxGroup
        v-model="selected"
        label="Email preferences"
        :options="options"
      />
      <p class="text-sm text-muted-foreground">
        Selected: {{ selected.length === 0 ? "none" : selected.join(", ") }}
      </p>
    </div>
  </div>
</template>
