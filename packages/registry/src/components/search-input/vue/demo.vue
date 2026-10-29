<script setup lang="ts">
import { ref } from "vue";

import { SearchInput } from "./index";

const query = ref("");
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <SearchInput
      placeholder="Search components..."
      aria-label="Search components"
    />

    <SearchInput
      default-value="dialog"
      aria-label="Search components"
    />

    <div class="grid gap-2">
      <SearchInput
        v-model="query"
        placeholder="Filter projects"
        aria-label="Filter projects"
        @clear="query = ''"
      />
      <p class="text-xs text-muted-foreground">
        {{ query ? `Searching for “${query}”` : "No filter applied" }}
      </p>
    </div>
  </div>
</template>
