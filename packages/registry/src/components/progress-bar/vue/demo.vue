<script setup lang="ts">
import { ProgressBar } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <div class="grid gap-2">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium">Uploading assets</span>
        <span class="text-muted-foreground">72%</span>
      </div>
      <ProgressBar :value="72" aria-label="Uploading assets" class="h-2" />
    </div>
    <div class="grid gap-2">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium">Importing contacts</span>
        <span class="text-muted-foreground">3 of 5 files</span>
      </div>
      <ProgressBar :value="60" aria-label="Importing contacts" />
    </div>
    <ProgressBar :value="60" aria-label="Upload progress" />
  </div>
</template>
