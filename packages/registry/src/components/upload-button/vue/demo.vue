<script setup lang="ts">
import { ref } from "vue";

import { UploadButton } from "./index";

const names = ref<string[]>([]);
</script>

<template>
  <div class="grid gap-3">
    <div class="flex flex-wrap items-center gap-3">
      <UploadButton
        accept="image/*"
        multiple
        label="Upload images"
        @files="names = Array.from($event, (file) => file.name)"
      />
      <UploadButton variant="outline" accept=".pdf,.doc,.docx">
        Upload document
      </UploadButton>
    </div>
    <p v-if="names.length > 0" class="text-xs text-muted-foreground">
      Selected: {{ names.join(", ") }}
    </p>
  </div>
</template>
