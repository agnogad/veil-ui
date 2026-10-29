<script setup lang="ts">
import { Container } from "./index";
</script>

<template>
  <div class="w-full space-y-3">
    <Container
      v-for="size in ['sm', 'md', 'lg']"
      :key="size"
      :size="size"
      class="rounded-md border border-dashed px-4 py-2 text-xs text-muted-foreground"
    >
      max-w-{{ size }}
    </Container>
  </div>

  <div class="mt-4 w-full rounded-md border bg-muted/20 py-6">
    <Container size="md">
      <div class="rounded-md border bg-background p-4">
        <p class="text-sm font-medium">Page section</p>
        <p class="mt-1 text-sm text-muted-foreground">
          Content is centered with 16px gutters on mobile and 24px above the
          small breakpoint.
        </p>
      </div>
    </Container>
  </div>
</template>
