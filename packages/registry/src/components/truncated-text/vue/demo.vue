<script setup lang="ts">
import { TruncatedText } from "./index";

const copy =
  "The CLI resolves dependencies, writes the files and installs what is missing. Your design system grows from there, one component at a time, with no runtime wrapper in the way.";
</script>

<template>
  <div class="grid gap-4">
    <TruncatedText :lines="2" class="max-w-sm text-sm">
      {{ copy }}
    </TruncatedText>
    <TruncatedText :lines="1" class="max-w-48 text-sm">
      {{ copy }}
    </TruncatedText>
    <TruncatedText :lines="3" class="max-w-sm text-sm text-muted-foreground">
      {{ copy }}
    </TruncatedText>
  </div>
</template>
