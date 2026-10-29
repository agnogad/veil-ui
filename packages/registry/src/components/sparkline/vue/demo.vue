<script setup lang="ts">
import { Sparkline } from "./index";

const values = [12, 18, 14, 22, 20, 27, 25, 31, 29, 36];
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <Sparkline :data="values" label="Weekly revenue trend" />
    <Sparkline
      :data="values"
      color="#22c55e"
      show-area
      label="Weekly sign-ups trend"
      class="h-10 w-40"
    />
  </div>
</template>
