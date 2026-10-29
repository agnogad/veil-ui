<script setup lang="ts">
import { Box } from "./index";
</script>

<template>
  <Box class="rounded-lg border p-4 text-sm">
    A generic layout primitive.
  </Box>

  <div class="mt-4 grid gap-2">
    <Box
      v-for="padding in ['sm', 'md', 'lg']"
      :key="padding"
      :padding="padding"
      class="rounded-md border bg-muted/20 text-sm"
    >
      <span class="text-muted-foreground">padding="{{ padding }}"</span>
    </Box>
  </div>

  <Box
    as-child
    padding="md"
    class="mt-4 inline-block rounded-md border underline-offset-4 hover:underline"
  >
    <a href="#box">Rendered as an anchor</a>
  </Box>
</template>
