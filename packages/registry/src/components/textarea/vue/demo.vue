<script setup lang="ts">
import { ref } from "vue";

import { Textarea } from "./index";

const message = ref("");
</script>

<template>
  <div class="grid max-w-sm gap-2">
    <label for="vue-message" class="text-sm font-medium leading-none">
      Message
    </label>
    <Textarea
      id="vue-message"
      v-model="message"
      rows="4"
      placeholder="Tell us what you need…"
    />
  </div>
</template>
