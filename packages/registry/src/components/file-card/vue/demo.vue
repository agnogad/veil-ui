<script setup lang="ts">
import { Download, FileText, Trash2 } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { FileCard } from "./index";

const showNotes = ref(true);
</script>

<template>
  <div class="grid max-w-sm gap-4">
    <FileCard name="quarterly-report.pdf" size="2.4 MB" kind="pdf" />

    <FileCard name="hero-banner.png" size="860 KB" kind="image">
      <template #actions>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Download hero-banner.png"
        >
          <Download class="size-4" aria-hidden />
        </Button>
      </template>
    </FileCard>

    <FileCard
      v-if="showNotes"
      name="notes.txt"
      size="4 KB"
      kind="text"
      description="Shared with the design team."
    >
      <template #actions>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Preview notes.txt"
        >
          <FileText class="size-4" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Remove notes.txt"
          @click="showNotes = false"
        >
          <Trash2 class="size-4" aria-hidden />
        </Button>
      </template>
    </FileCard>
  </div>
</template>
