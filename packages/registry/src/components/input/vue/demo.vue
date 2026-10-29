<script setup lang="ts">
import { ref } from "vue";

import { Input } from "./index";

const email = ref("");
</script>

<template>
  <div class="grid max-w-sm gap-2">
    <label for="vue-email" class="text-sm font-medium leading-none">
      Email
    </label>
    <Input id="vue-email" v-model="email" type="email" placeholder="you@example.com" />
    <p class="text-xs text-muted-foreground">Value: {{ email || "—" }}</p>
  </div>

  <div class="mt-4 max-w-sm">
    <Input type="file" />
  </div>
</template>
