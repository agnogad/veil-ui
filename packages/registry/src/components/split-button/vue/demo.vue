<script setup lang="ts">
import { SplitButton } from "./index";
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <SplitButton
      label="Deploy"
      :items="[
        { label: 'Deploy to production' },
        { label: 'Deploy to preview' },
        { label: 'Redeploy previous build' },
      ]"
    />
    <SplitButton
      label="Delete"
      variant="destructive"
      :items="[
        { label: 'Delete project' },
        { label: 'Delete all deployments' },
      ]"
    />
    <SplitButton
      label="Publish"
      align="start"
      :items="[
        { label: 'Publish to npm' },
        { label: 'Publish docs only' },
        { label: 'Schedule release', disabled: true },
      ]"
    />
  </div>
</template>
