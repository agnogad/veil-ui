<script setup lang="ts">
import { ref } from "vue";

import { MobilePageIndicator } from "./index";

const index = ref(0);
const count = 3;

function handleSelect(page: number) {
  index.value = page;
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-lg border bg-muted/20 p-6">
    <div class="grid h-24 place-items-center text-sm text-muted-foreground">
      Slide {{ index + 1 }}
    </div>
    <MobilePageIndicator :count="count" :index="index" :on-select="handleSelect" />
  </div>
</template>
