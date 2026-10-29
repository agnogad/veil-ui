<script setup lang="ts">
import { ReadMore } from "./index";

const copy =
  "Buttons, inputs, navigation and overlays arrive as source files. Keep what you need, delete the rest, and edit every class. The registry only resolves dependencies and writes files, so there is no runtime to upgrade or fight with later.";
</script>

<template>
  <div class="grid max-w-sm gap-6">
    <ReadMore :lines="2" class="text-sm">
      {{ copy }}
    </ReadMore>
    <ReadMore :lines="3" default-expanded class="text-sm">
      {{ copy }}
    </ReadMore>
  </div>
</template>
