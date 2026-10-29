<script setup lang="ts">
import { ref } from "vue";

import { Checkbox } from "./index";

const accepted = ref<boolean | "indeterminate">(false);
</script>

<template>
  <div class="grid gap-3 text-sm">
    <label class="flex items-center gap-2">
      <Checkbox v-model="accepted" />
      Accept terms and conditions
    </label>
    <label class="flex items-center gap-2">
      <Checkbox :model-value="'indeterminate'" disabled />
      Select all (indeterminate)
    </label>
  </div>
  <p class="mt-2 text-xs text-muted-foreground">
    State: {{ accepted }}
  </p>
</template>
