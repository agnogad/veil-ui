<script setup lang="ts">
import { Caption } from "./index";
</script>

<template>
  <div class="grid max-w-sm gap-6">
    <Caption>Updated 2 minutes ago</Caption>

    <figure class="grid gap-2">
      <div
        class="aspect-video rounded-md border bg-gradient-to-br from-muted to-muted-foreground/20"
        aria-hidden="true"
      />
      <figcaption>
        <Caption>Dashboard overview after the first sync.</Caption>
      </figcaption>
    </figure>

    <Caption tone="default">Default tone caption</Caption>
  </div>
</template>
