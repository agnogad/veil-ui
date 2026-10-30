<script setup lang="ts">
import { Zap } from "lucide-vue-next";

import { FeatureCard } from "./index";
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <FeatureCard
      :icon="Zap"
      title="Instant install"
      description="Copy the source you need and keep full ownership."
    />
    <FeatureCard
      :icon="Zap"
      title="Accessible by default"
      description="Keyboard support and ARIA semantics come standard."
    />
  </div>
</template>
