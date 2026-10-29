<script setup lang="ts">
import { SafeAreaView } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <SafeAreaView
      data-testid="safe-area"
      class="w-full max-w-sm border-y border-dashed bg-muted/30 p-4 text-sm text-muted-foreground"
    >
      Content respects all device insets.
    </SafeAreaView>

    <SafeAreaView
      :edges="['bottom']"
      class="w-full max-w-sm rounded-lg border bg-background p-4 text-sm"
    >
      <p class="font-medium">Sticky footer content</p>
      <p class="text-xs text-muted-foreground">
        Only the bottom inset is applied.
      </p>
    </SafeAreaView>
  </div>
</template>
