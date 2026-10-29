<script setup lang="ts">
import { ArrowRight, Heart, Mail } from "lucide-vue-next";

import { Icon } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <span class="inline-flex items-center gap-2 text-sm">
      Continue <Icon :icon="ArrowRight" />
    </span>

    <Icon :icon="Heart" label="Favorite" class="text-destructive" />

    <div class="flex items-end gap-3">
      <Icon :icon="Mail" size="xs" />
      <Icon :icon="Mail" size="sm" />
      <Icon :icon="Mail" size="md" />
      <Icon :icon="Mail" size="lg" />
      <Icon :icon="Mail" size="xl" />
    </div>
  </div>
</template>
