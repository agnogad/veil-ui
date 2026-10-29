<script setup lang="ts">
import { Bookmark, Italic, Underline } from "lucide-vue-next";
import { ref } from "vue";

import { Toggle } from "./index";

const saved = ref(false);
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Toggle v-model="saved" aria-label="Bookmark this page">
      <Bookmark />
    </Toggle>
    <Toggle variant="outline" aria-label="Italic">
      <Italic />
    </Toggle>
    <Toggle variant="outline" aria-label="Underline">
      <Underline />
    </Toggle>
    <Toggle size="sm" aria-label="Bookmark">
      <Bookmark />
    </Toggle>
    <Toggle size="lg" aria-label="Bookmark">
      <Bookmark />
    </Toggle>
    <Toggle variant="outline">
      <Bookmark /> Save
    </Toggle>
  </div>
  <p class="mt-3 text-sm text-muted-foreground">
    Bookmark is {{ saved ? "on" : "off" }}
  </p>
</template>
