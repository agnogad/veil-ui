<script setup lang="ts">
import { Check, Share2 } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Share sheet title. */
    title?: string;
    text?: string;
    /** URL to share; defaults to the current location. */
    url?: string;
    label?: string;
    copiedLabel?: string;
    class?: string;
  }>(),
  { label: "Share", copiedLabel: "Link copied" },
);

const copied = ref(false);

async function handleShare() {
  const shareUrl = props.url ?? window.location.href;

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title: props.title, text: props.text, url: shareUrl });
      return;
    } catch {
      return;
    }
  }

  await navigator.clipboard?.writeText(shareUrl);
  copied.value = true;
}
</script>

<template>
  <Button
    data-slot="share-button"
    v-bind="$attrs"
    :class="props.class"
    @click="handleShare"
  >
    <Check v-if="copied" aria-hidden="true" />
    <Share2 v-else aria-hidden="true" />
    <span aria-live="polite">{{ copied ? copiedLabel : label }}</span>
  </Button>
</template>
