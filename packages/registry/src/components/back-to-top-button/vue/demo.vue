<script setup lang="ts">
import { ref } from "vue";

import { BackToTopButton } from "./index";

const clicks = ref(0);
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <BackToTopButton
      visible
      size="icon"
      @scroll-to-top="clicks += 1"
    />
    <BackToTopButton visible variant="outline" size="icon" />
    <BackToTopButton visible label="Scroll to top" variant="secondary" />
    <span class="text-sm text-muted-foreground">Scrolled {{ clicks }}×</span>
  </div>
</template>
