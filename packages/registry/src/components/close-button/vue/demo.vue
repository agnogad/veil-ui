<script setup lang="ts">
import { CloseButton } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <CloseButton />
    <CloseButton variant="outline" label="Close dialog" />
    <CloseButton size="lg" variant="ghost" />
  </div>
</template>
