<script setup lang="ts">
import { ref } from "vue";

import { Switch } from "./index";

const enabled = ref(true);
</script>

<template>
  <label class="flex items-center gap-3 text-sm">
    <Switch v-model="enabled" aria-label="Product updates" />
    Product updates
  </label>
  <p class="mt-2 text-xs text-muted-foreground">
    {{ enabled ? "Subscribed" : "Muted" }}
  </p>
</template>
