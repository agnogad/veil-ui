<script setup lang="ts">
import { ref } from "vue";

import { LoadingButton } from "./index";

const loading = ref(false);

function deploy() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
  }, 1500);
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <LoadingButton>Save changes</LoadingButton>
    <LoadingButton loading loading-label="Saving">Save changes</LoadingButton>
    <LoadingButton
      :loading="loading"
      loading-label="Deploying"
      variant="outline"
      @click="deploy"
    >
      {{ loading ? "Deploying..." : "Deploy" }}
    </LoadingButton>
  </div>
</template>
