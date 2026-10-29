<script setup lang="ts">
import { Text } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <Text>
      Ship a polished interface without a component wrapper library.
    </Text>

    <div class="grid gap-2">
      <Text tone="default">Default body text</Text>
      <Text tone="muted">Muted supporting text</Text>
      <Text tone="destructive">Destructive status text</Text>
      <Text weight="semibold">Semibold emphasis</Text>
    </div>

    <div class="max-w-56 rounded-md border p-3">
      <Text truncate>
        A long single line that gets clipped with an ellipsis instead of wrapping
        onto the next line.
      </Text>
    </div>
  </div>
</template>
