<script setup lang="ts">
import { ref } from "vue";

import { FileInput } from "./index";

const count = ref(0);
</script>

<template>
  <div class="flex max-w-sm flex-col gap-4">
    <FileInput
      label="Resume"
      accept=".pdf,.doc,.docx"
      hint="PDF or Word document, up to 5 MB."
    />

    <div class="flex flex-col gap-2">
      <FileInput
        label="Attachments"
        multiple
        hint="Drop several files at once."
        @files-change="count = $event?.length ?? 0"
      />
      <p class="text-sm text-muted-foreground">
        {{ count }} file{{ count === 1 ? "" : "s" }} selected
      </p>
    </div>

    <FileInput
      label="Avatar"
      accept="image/*"
      error="Please choose an image smaller than 2 MB."
    />
  </div>
</template>
