<script setup lang="ts">
import { ref } from "vue";

import { IconPicker } from "./index";

const selected = ref("Star");
</script>

<template>
  <div class="grid gap-4">
    <IconPicker class="max-w-xs" />
    <IconPicker v-model:value="selected" class="max-w-xs" />
  </div>
</template>
