<script setup lang="ts">
import { SplitLayout } from "./index";
</script>

<template>
  <div class="grid w-full gap-6">
    <SplitLayout class="w-full">
      <template #aside>
        <div class="rounded-md border bg-muted/20 p-4 text-sm">
          Table of contents
        </div>
      </template>
      <article class="rounded-md border p-4">
        <h3 class="text-sm font-semibold">Article</h3>
        <p class="mt-2 text-sm text-muted-foreground">
          The main pane grows to fill the remaining space.
        </p>
      </article>
    </SplitLayout>

    <SplitLayout aside-position="start" aside-size="sm" class="w-full">
      <template #aside>
        <div class="rounded-md border bg-muted/20 p-4 text-sm">
          Navigation
        </div>
      </template>
      <div class="rounded-md border p-4 text-sm text-muted-foreground">
        Content with a narrow leading aside.
      </div>
    </SplitLayout>

    <SplitLayout sticky-aside gap="lg" class="w-full">
      <template #aside>
        <div class="rounded-md border bg-muted/20 p-4 text-sm">
          Sticks while the main pane scrolls.
        </div>
      </template>
      <div class="grid gap-3">
        <div
          v-for="index in 6"
          :key="index"
          class="rounded-md border p-4 text-sm text-muted-foreground"
        >
          Section {{ index }}
        </div>
      </div>
    </SplitLayout>
  </div>
</template>
