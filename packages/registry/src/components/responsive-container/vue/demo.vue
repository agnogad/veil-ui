<script setup lang="ts">
import { ResponsiveContainer } from "./index";
</script>

<template>
  <div class="grid gap-2">
    <ResponsiveContainer
      v-for="size in ['sm', 'md', 'lg']"
      :key="size"
      :max-width="size"
      class="rounded-md border bg-muted/20 px-3 py-2 text-xs"
    >
      maxWidth="{{ size }}"
    </ResponsiveContainer>
  </div>

  <ResponsiveContainer
    gutter="lg"
    class="mt-4 rounded-md border bg-muted/20 py-2 text-xs"
  >
    Wider gutters on larger screens.
  </ResponsiveContainer>

  <ResponsiveContainer
    fluid
    max-width="full"
    class="mt-2 rounded-md border bg-muted/20 px-3 py-2 text-xs"
  >
    Fluid width, no centering.
  </ResponsiveContainer>
</template>
