<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { ErrorState } from "./index";
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <ErrorState>
      <template #action>
        <Button variant="outline" size="sm">Retry</Button>
      </template>
    </ErrorState>
    <ErrorState
      title="Could not load invoices"
      description="Check your connection and try again."
    >
      <template #action>
        <Button variant="outline" size="sm">Try again</Button>
      </template>
    </ErrorState>
  </div>
</template>
