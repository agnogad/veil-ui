<script setup lang="ts">
import { ScrollArea, ScrollBar } from "./index";

const rows = Array.from({ length: 20 }, (_, index) => index + 1);
const cards = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <ScrollArea class="h-48 w-full max-w-sm rounded-md border">
      <div class="grid gap-2 p-3">
        <div
          v-for="row in rows"
          :key="row"
          class="rounded-md border bg-muted/20 px-3 py-2 text-sm"
        >
          Row {{ row }}
        </div>
      </div>
    </ScrollArea>

    <ScrollArea
      class="w-full max-w-sm whitespace-nowrap rounded-md border"
    >
      <div class="flex gap-2 p-3">
        <div
          v-for="card in cards"
          :key="card"
          class="flex size-24 shrink-0 items-center justify-center rounded-md border bg-muted/20 text-sm"
        >
          {{ card }}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
</template>
