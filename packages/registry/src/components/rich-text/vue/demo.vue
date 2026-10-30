<script setup lang="ts">
import { RichText } from "./index";
</script>

<template>
  <div class="grid max-w-lg gap-4">
    <RichText
      default-value="<p>Select text and use <strong>bold</strong>, <em>italic</em> or <u>underline</u>.</p>"
    />
    <RichText
      disabled
      default-value="<p>Read-only content rendered with the same editor shell.</p>"
    />
  </div>
</template>
