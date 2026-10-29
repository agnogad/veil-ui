<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { FullScreenLayout } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <div class="h-72 overflow-hidden rounded-md border">
      <FullScreenLayout centered class="min-h-0">
        <div class="w-64 rounded-lg border bg-background p-6 text-center shadow-sm">
          <p class="text-sm font-semibold">Sign in</p>
          <p class="mt-1 text-xs text-muted-foreground">
            Use the centered variant for auth screens.
          </p>
          <Button size="sm" class="mt-4 w-full">Continue</Button>
        </div>
      </FullScreenLayout>
    </div>

    <div class="h-64 overflow-hidden rounded-md border">
      <FullScreenLayout class="min-h-0">
        <template #header>
          <span class="text-sm font-medium">Workspace</span>
        </template>
        <div class="p-4 text-sm text-muted-foreground">
          Main area fills the remaining height.
        </div>
        <template #footer>
          <span class="text-xs text-muted-foreground">Status: online</span>
        </template>
      </FullScreenLayout>
    </div>

    <div class="h-64 overflow-hidden rounded-md border">
      <FullScreenLayout padded class="min-h-0">
        <div
          class="size-full rounded-md border border-dashed p-3 text-sm text-muted-foreground"
        >
          Padding is applied to the main region.
        </div>
      </FullScreenLayout>
    </div>
  </div>
</template>
