<script setup lang="ts">
import { CircularProgress } from "./index";
</script>

<template>
  <div class="flex items-center gap-4">
    <CircularProgress :value="25" :size="32" :stroke-width="3" />
    <CircularProgress :value="50" show-value />
    <CircularProgress :value="80" :size="64" :stroke-width="5" show-value />
    <CircularProgress :value="65" show-value />
  </div>
</template>
