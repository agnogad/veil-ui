<script setup lang="ts">
import { ref } from "vue";

import { ProfileEditor } from "./index";

const saved = ref(false);
</script>

<template>
  <div class="grid w-full max-w-lg gap-3">
    <ProfileEditor
      class="rounded-xl border bg-background p-5"
      default-name="Ada Lovelace"
      default-handle="ada"
      default-bio="Mathematician and writer."
      default-website="https://ada.dev"
      @save="saved = true"
      @cancel="saved = false"
    />
    <p class="text-sm text-muted-foreground" aria-live="polite">
      {{ saved ? "Profile saved." : "Changes are local until you save." }}
    </p>
  </div>
</template>
