<script setup lang="ts">
import { FileUp } from "lucide-vue-next";
import { ref } from "vue";

import { Dropzone } from "./index";

const names = ref<string[]>([]);

function onFiles(files: File[]) {
  names.value = files.map((file) => file.name);
}
</script>

<template>
  <div class="flex max-w-md flex-col gap-6">
    <div class="flex flex-col gap-3">
      <Dropzone
        description="PNG, JPG or PDF up to 10 MB"
        @files="onFiles"
      />
      <p v-if="names.length > 0" class="text-sm text-muted-foreground">
        Added: {{ names.join(", ") }}
      </p>
    </div>

    <Dropzone
      :icon="FileUp"
      title="Drop your invoices"
      description="Each file must be smaller than 5 MB"
      accept=".pdf"
      multiple
      @files="onFiles"
    />

    <Dropzone
      title="Uploads are paused"
      description="Contact your administrator to enable uploads"
      disabled
      @files="onFiles"
    />
  </div>
</template>
