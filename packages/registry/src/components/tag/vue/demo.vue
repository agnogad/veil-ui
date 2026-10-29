<script setup lang="ts">
import { Tag } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-2">
      <Tag>New</Tag>
      <Tag variant="secondary">Beta</Tag>
      <Tag variant="outline">Archived</Tag>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Tag variant="secondary">
        <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Live
      </Tag>
      <Tag variant="muted">
        <span class="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        Queued
      </Tag>
      <Tag variant="outline">
        <span
          class="size-1.5 rounded-full bg-muted-foreground"
          aria-hidden="true"
        />
        Draft
      </Tag>
    </div>
  </div>
</template>
