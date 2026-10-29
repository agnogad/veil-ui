<script setup lang="ts">
import { Progress } from "./index";
</script>

<template>
  <div class="grid max-w-sm gap-6">
    <div>
      <div class="mb-2 flex items-center justify-between text-sm">
        <span class="font-medium">Uploading assets</span>
        <span class="text-muted-foreground">64%</span>
      </div>
      <Progress :value="64" />
    </div>
    <Progress :value="100" />
  </div>
</template>
