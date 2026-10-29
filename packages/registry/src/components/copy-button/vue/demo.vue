<script setup lang="ts">
import { CopyButton } from "./index";
</script>

<template>
  <div class="grid max-w-sm gap-3">
    <div
      class="flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2"
    >
      <code class="text-sm">npx veil-ui@latest add button</code>
      <CopyButton value="npx veil-ui@latest add button" />
    </div>
    <div class="flex items-center gap-2 rounded-md border px-3 py-2">
      <span class="text-sm text-muted-foreground">API key</span>
      <code class="text-sm">sk_live_51H8</code>
      <CopyButton
        variant="ghost"
        size="sm"
        value="sk_live_51H8"
        label="Copy API key"
        copied-label="API key copied"
      />
    </div>
    <div class="flex items-center gap-2">
      <CopyButton size="sm" value="veil-ui" />
      <CopyButton size="default" value="veil-ui" />
      <CopyButton size="lg" value="veil-ui" />
    </div>
  </div>
</template>
