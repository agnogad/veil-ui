<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { VStack } from "./index";
</script>

<template>
  <VStack gap="sm" class="w-full max-w-sm">
    <div class="rounded-md border p-3 text-sm">First item</div>
    <div class="rounded-md border p-3 text-sm">Second item</div>
    <div class="rounded-md border p-3 text-sm">Third item</div>
  </VStack>

  <VStack gap="md" class="mt-6 w-full max-w-sm">
    <VStack gap="xs">
      <Label for="vstack-email">Email</Label>
      <Input id="vstack-email" placeholder="you@example.com" />
    </VStack>
    <VStack gap="xs">
      <Label for="vstack-name">Name</Label>
      <Input id="vstack-name" placeholder="Ada Lovelace" />
    </VStack>
  </VStack>

  <VStack align="center" gap="sm" class="mt-6">
    <span class="size-10 rounded-full bg-muted" aria-hidden="true" />
    <p class="text-sm font-medium">Ada Lovelace</p>
    <p class="text-xs text-muted-foreground">Engineer</p>
  </VStack>
</template>
