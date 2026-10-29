<script setup lang="ts">
import { MessageSquare, Pencil, Plus } from "lucide-vue-next";

import { Fab } from "./index";
</script>

<template>
  <div
    class="relative h-44 w-full overflow-hidden rounded-lg border bg-muted/20"
  >
    <p class="absolute top-4 left-4 text-sm text-muted-foreground">
      Floating above the page
    </p>
    <Fab aria-label="Create item" class="absolute right-4 bottom-4">
      <Plus />
    </Fab>
    <Fab
      label="New project"
      aria-label="New project"
      class="absolute bottom-4 left-4"
    >
      <Pencil />
    </Fab>
    <Fab
      aria-label="Start chat"
      size="lg"
      class="absolute bottom-4 left-1/2 -translate-x-1/2"
    >
      <MessageSquare />
    </Fab>
  </div>
</template>
