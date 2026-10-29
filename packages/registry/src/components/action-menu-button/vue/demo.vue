<script setup lang="ts">
import { ActionMenuButton } from "./index";

const items = [
  { label: "Edit" },
  { label: "Duplicate" },
  { label: "Archive" },
];
</script>

<template>
  <div class="flex items-center gap-3">
    <ActionMenuButton :items="items" />
    <ActionMenuButton
      label="Project actions"
      variant="outline"
      align="start"
      :items="[
        { label: 'Rename' },
        { label: 'Delete project', destructive: true },
        { label: 'Unavailable', disabled: true },
      ]"
    />
  </div>
</template>
