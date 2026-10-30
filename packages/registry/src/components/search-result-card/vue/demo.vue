<script setup lang="ts">
import { SearchResultCard } from "./index";
</script>

<template>
  <div class="grid gap-6">
    <SearchResultCard
      breadcrumb="Docs"
      url="veil-ui.dev/docs/components/button"
      title="Button — Veil UI"
      snippet="Triggers an action or event. Supports variants, sizes, icons and asChild composition."
    />
    <SearchResultCard
      breadcrumb="Docs"
      url="veil-ui.dev/docs/frameworks"
      title="Vue and plain HTML"
      snippet="Use the same components in React, Vue and plain HTML with one registry."
    />
  </div>
</template>
