<script setup lang="ts">
import { ref } from "vue";

import { TagsInput } from "./index";

const tags = ref<string[]>(["design", "vue"]);
</script>

<template>
  <div class="flex max-w-md flex-col gap-6">
    <div class="flex flex-col gap-3">
      <TagsInput v-model="tags" label="Skills" />
      <p class="text-sm text-muted-foreground">
        {{ tags.length }} tag{{ tags.length === 1 ? "" : "s" }} selected
      </p>
    </div>

    <TagsInput
      label="Topics"
      placeholder="Up to 3 topics"
      :max-tags="3"
      :default-value="['accessibility']"
    />

    <TagsInput
      label="Locked keywords"
      :default-value="['read-only', 'archived']"
      disabled
    />
  </div>
</template>
