<script setup lang="ts">
import { Share2 } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { MobileShareSheet } from "./index";

const open = ref(false);
</script>

<template>
  <div
    class="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border p-4"
  >
    <div class="min-w-0 text-sm">
      <p class="font-medium">Design tokens guide</p>
      <p class="truncate text-xs text-muted-foreground">
        https://veil-ui.dev/docs/theming
      </p>
    </div>
    <Button variant="outline" @click="open = true">
      <Share2 aria-hidden="true" /> Share
    </Button>
    <MobileShareSheet
      v-model:open="open"
      url="https://veil-ui.dev/docs/theming"
      title="Share guide"
    />
  </div>
</template>
