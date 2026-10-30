<script setup lang="ts">
import { ref } from "vue";

import { MobileSearch } from "./index";

const result = ref("");
</script>

<template>
  <div class="w-full max-w-sm">
    <MobileSearch
      placeholder="Search projects"
      :suggestions="['Design tokens', 'Release notes', 'Roadmap']"
      @search="result = $event"
    />
    <p class="mt-3 text-sm text-muted-foreground">
      {{ result ? `Searching for “${result}”` : "Try a suggestion" }}
    </p>
  </div>
</template>
