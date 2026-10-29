<script setup lang="ts">
import { ref } from "vue";

import { RatingInput } from "./index";

const rating = ref(3);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <RatingInput
        v-model="rating"
        label="Product rating"
        show-value
      />
      <p class="text-sm text-muted-foreground">
        {{ rating === 0 ? "No rating yet" : `${rating} out of 5 stars` }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <RatingInput
        :default-value="4"
        read-only
        label="Average rating"
        show-value
      />
      <p class="text-sm text-muted-foreground">Based on 128 reviews</p>
    </div>

    <div class="flex flex-col gap-4">
      <RatingInput size="sm" :default-value="2" label="Small rating" />
      <RatingInput size="md" :default-value="3" label="Medium rating" />
      <RatingInput size="lg" :default-value="5" label="Large rating" />
    </div>
  </div>
</template>
