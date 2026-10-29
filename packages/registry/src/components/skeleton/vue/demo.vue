<script setup lang="ts">
import { Skeleton } from "./index";
</script>

<template>
  <div class="flex w-full max-w-sm items-center gap-3">
    <Skeleton class="size-10 shrink-0 rounded-full" />
    <div class="grid flex-1 gap-2">
      <Skeleton class="h-3 w-3/4" />
      <Skeleton class="h-3 w-1/2" />
    </div>
  </div>
</template>
