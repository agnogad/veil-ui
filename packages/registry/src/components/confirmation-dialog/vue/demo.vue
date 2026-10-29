<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { ConfirmationDialog } from "./index";

const open = ref(false);
const lastAction = ref("None yet");
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button variant="outline" @click="open = true">Discard draft</Button>
    <p class="text-sm text-muted-foreground">
      Dialog is {{ open ? "open" : "closed" }}. Last action: {{ lastAction }}.
    </p>
    <ConfirmationDialog
      v-model:open="open"
      title="Discard draft?"
      description="Your unsaved changes will be lost."
      confirm-label="Discard"
      destructive
      @confirm="lastAction = 'Discard'"
      @cancel="lastAction = 'Cancel'"
    />
  </div>
</template>
