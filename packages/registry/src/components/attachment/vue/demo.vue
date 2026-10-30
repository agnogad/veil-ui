<script setup lang="ts">
import { ref } from "vue";

import { Attachment } from "./index";

const files = ref([
  { name: "brief.docx", size: "44 KB" },
  { name: "logo.svg", size: "8 KB" },
]);
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Attachment
      v-for="file in files"
      :key="file.name"
      :name="file.name"
      :size="file.size"
      @remove="files = files.filter((item) => item.name !== file.name)"
    >
      <template #remove />
    </Attachment>
    <span v-if="files.length === 0" class="text-sm text-muted-foreground">
      No attachments.
    </span>
  </div>
</template>
