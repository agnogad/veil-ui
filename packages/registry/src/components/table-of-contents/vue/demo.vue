<script setup lang="ts">
import { TableOfContents, type TocItem } from "./index";

const items: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "theming", title: "Theming", level: 3 },
  { id: "tokens", title: "Tokens", level: 4 },
];
</script>

<template>
  <div class="grid gap-4">
    <TableOfContents :items="items" class="max-w-56" />
    <TableOfContents :items="items" active-id="theming" class="max-w-56" />
  </div>
</template>
