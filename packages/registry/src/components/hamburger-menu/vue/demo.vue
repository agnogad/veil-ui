<script setup lang="ts">
import { ref } from "vue";

import { HamburgerMenu } from "./index";

const open = ref(false);
</script>

<template>
  <div class="grid gap-4">
    <HamburgerMenu />

    <div class="flex items-center gap-3 text-sm text-muted-foreground">
      <HamburgerMenu v-model:open="open" />
      <span>{{ open ? "Menu is open" : "Menu is closed" }}</span>
    </div>
  </div>
</template>
