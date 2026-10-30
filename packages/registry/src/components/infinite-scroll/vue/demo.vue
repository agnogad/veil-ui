<script setup lang="ts">
import { ref } from "vue";

import { InfiniteScroll } from "./index";

const items = ref(Array.from({ length: 6 }, (_, index) => `Item ${index + 1}`));
const loading = ref(false);

function loadMore() {
  loading.value = true;
  window.setTimeout(() => {
    items.value = [
      ...items.value,
      ...Array.from({ length: 3 }, (_, index) => `Item ${items.value.length + index + 1}`),
    ];
    loading.value = false;
  }, 600);
}
</script>

<template>
  <InfiniteScroll
    :has-more="items.length < 15"
    :loading="loading"
    class="max-w-sm"
    @load-more="loadMore"
  >
    <div
      v-for="item in items"
      :key="item"
      class="rounded-md border px-3 py-2 text-sm"
    >
      {{ item }}
    </div>
  </InfiniteScroll>
</template>
