<script setup lang="ts">
import {
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
} from "lucide-vue-next";
import type { Component } from "vue";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { FileKind } from "./types";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string;
    kind?: FileKind;
    description?: string;
    class?: string;
  }>(),
  { kind: "other" },
);

const kindIcon: Record<FileKind, Component> = {
  pdf: FileText,
  image: FileImage,
  sheet: FileSpreadsheet,
  archive: FileArchive,
  text: FileText,
  other: File,
};

const kindColor: Record<FileKind, string> = {
  pdf: "text-red-600 bg-red-500/10 dark:text-red-400",
  image: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
  sheet: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  archive: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
  text: "text-sky-600 bg-sky-500/10 dark:text-sky-400",
  other: "text-muted-foreground bg-muted",
};
</script>

<template>
  <Card
    data-slot="file-card"
    :class="cn('max-w-sm gap-3', props.class)"
  >
    <CardContent class="flex items-start gap-3">
      <span
        :class="
          cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            kindColor[kind],
          )
        "
      >
        <component :is="kindIcon[kind]" class="size-5" aria-hidden="true" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium">{{ name }}</p>
        <p class="text-xs text-muted-foreground">
          <span v-if="size">{{ size }} · </span>
          {{ kind.toUpperCase() }}
        </p>
        <p v-if="description" class="mt-1 text-sm text-muted-foreground">
          {{ description }}
        </p>
      </div>
      <div
        v-if="$slots.actions"
        class="flex shrink-0 items-center gap-1"
      >
        <slot name="actions" />
      </div>
    </CardContent>
  </Card>
</template>
