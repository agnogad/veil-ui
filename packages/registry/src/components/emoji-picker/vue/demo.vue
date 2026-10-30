<script setup lang="ts">
import { ref } from "vue";

import { EmojiPicker } from "./index";

const selected = ref<string | null>(null);
</script>

<template>
  <div class="grid gap-3">
    <EmojiPicker @select="selected = $event" />
    <p class="text-sm text-muted-foreground">
      Selected:
      <span v-if="selected" class="text-lg">{{ selected }}</span>
      <span v-else>none</span>
    </p>
  </div>
</template>
