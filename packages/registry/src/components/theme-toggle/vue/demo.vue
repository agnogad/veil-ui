<script setup lang="ts">
import { ThemeToggle } from "./index";
</script>

<template>
  <div class="flex items-center gap-3">
    <ThemeToggle />
    <ThemeToggle size="sm" />
    <ThemeToggle size="lg" variant="outline" />
  </div>
</template>
