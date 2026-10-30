<script setup lang="ts">
import { ref } from "vue";

import { PullToRefresh } from "./index";

const seed = ["Morning stand-up", "Design review", "Ship changelog"];
const items = ref([...seed]);

function refresh() {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      items.value = [`Refreshed at ${new Date().toLocaleTimeString()}`, ...items.value];
      resolve();
    }, 600);
  });
}
</script>

<template>
  <PullToRefresh class="w-full max-w-sm" @refresh="refresh">
    <ul class="divide-y">
      <li v-for="item in items" :key="item" class="px-4 py-3 text-sm">
        {{ item }}
      </li>
    </ul>
  </PullToRefresh>
</template>
