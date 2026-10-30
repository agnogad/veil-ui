<script setup lang="ts">
import { RichTextEditor } from "./index";
</script>

<template>
  <div class="grid max-w-xl gap-4">
    <RichTextEditor default-value="<p>Tell us about <strong>your project</strong>.</p>" />
    <RichTextEditor disabled default-value="<p>This content is locked.</p>" />
  </div>
</template>
