<script setup lang="ts">
import { Flex } from "./index";
</script>

<template>
  <Flex direction="row" gap="sm" align="center">
    <span class="size-8 rounded-md bg-muted" aria-hidden="true" />
    <span class="size-8 rounded-md bg-muted" aria-hidden="true" />
    <span class="size-8 rounded-md bg-muted" aria-hidden="true" />
  </Flex>

  <Flex
    direction="row"
    justify="between"
    align="center"
    class="mt-4 w-full rounded-md border p-3 text-sm"
  >
    <span class="font-medium">Storage</span>
    <span class="text-muted-foreground">2.4 GB of 5 GB</span>
  </Flex>
</template>
