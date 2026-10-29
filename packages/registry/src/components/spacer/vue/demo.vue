<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { Spacer } from "./index";
</script>

<template>
  <div class="flex items-center rounded-md border p-3">
    <span class="text-sm font-medium">Left</span>
    <Spacer />
    <span class="text-sm text-muted-foreground">Right</span>
  </div>

  <div class="mt-4 flex items-center rounded-md border p-3 text-sm">
    <span class="size-8 rounded-md bg-muted" aria-hidden="true" />
    <Spacer size="md" />
    <span class="size-8 rounded-md bg-muted" aria-hidden="true" />
    <Spacer size="lg" />
    <span class="size-8 rounded-md bg-muted" aria-hidden="true" />
  </div>

  <div class="mt-4 flex items-center rounded-md border p-2">
    <Button size="sm" variant="ghost">Cancel</Button>
    <Spacer />
    <Button size="sm">Save</Button>
  </div>
</template>
