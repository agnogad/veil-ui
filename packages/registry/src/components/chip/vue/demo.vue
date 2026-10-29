<script setup lang="ts">
import { ref } from "vue";

import { Chip } from "./index";

const options = ["Design", "Engineering", "Product"];
const selected = ref<string[]>(["Design"]);

function toggle(option: string) {
  selected.value = selected.value.includes(option)
    ? selected.value.filter((item) => item !== option)
    : [...selected.value, option];
}
</script>

<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-2">
      <Chip variant="muted">React</Chip>
      <Chip variant="muted">TypeScript</Chip>
      <Chip variant="muted">Tailwind</Chip>
    </div>

    <div class="flex flex-wrap gap-2">
      <Chip
        v-for="option in options"
        :key="option"
        as-child
        :variant="selected.includes(option) ? 'default' : 'outline'"
      >
        <button
          type="button"
          :aria-pressed="selected.includes(option)"
          @click="toggle(option)"
        >
          {{ option }}
        </button>
      </Chip>
    </div>
  </div>
</template>
