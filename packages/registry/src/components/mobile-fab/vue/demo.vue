<script setup lang="ts">
import { MessageSquare, Plus } from "lucide-vue-next";

import { MobileFab } from "./index";
</script>

<template>
  <div
    class="relative h-44 w-full overflow-hidden rounded-lg border bg-muted/20"
  >
    <p class="absolute left-4 top-4 text-sm text-muted-foreground">
      Thumb-friendly floating action
    </p>
    <MobileFab
      class="absolute bottom-4 right-4"
      aria-label="Create item"
    >
      <Plus aria-hidden="true" />
    </MobileFab>
    <MobileFab
      class="absolute bottom-4 left-4"
      label="New chat"
      aria-label="New chat"
    >
      <MessageSquare aria-hidden="true" />
    </MobileFab>
  </div>
</template>
