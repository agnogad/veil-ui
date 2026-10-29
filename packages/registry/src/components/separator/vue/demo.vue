<script setup lang="ts">
import { Separator } from "./index";
</script>

<template>
  <div class="max-w-md">
    <div class="text-sm font-medium">Veil UI</div>
    <div class="text-sm text-muted-foreground">
      Copy-paste components, no runtime package.
    </div>
    <Separator class="my-4" />
    <div class="flex h-5 items-center gap-3 text-sm">
      <span>Documentation</span>
      <Separator orientation="vertical" />
      <span>Registry</span>
      <Separator orientation="vertical" />
      <span>CLI</span>
    </div>
  </div>
</template>
