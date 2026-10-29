<script setup lang="ts">
import { ref } from "vue";

import { FileUpload } from "./index";

const uploaded = ref(0);

function onUpload(files: File[]) {
  uploaded.value += files.length;
}
</script>

<template>
  <div class="flex max-w-lg flex-col gap-6">
    <div class="flex flex-col gap-3">
      <FileUpload @upload="onUpload" />
      <p class="text-sm text-muted-foreground">
        {{ uploaded }} file{{ uploaded === 1 ? "" : "s" }} uploaded in this
        session
      </p>
    </div>

    <FileUpload
      label="Drop your receipts"
      accept="image/png,image/jpeg,.pdf"
      :max-size="2 * 1024 * 1024"
      :max-files="3"
      @upload="onUpload"
    />
  </div>
</template>
