<script setup lang="ts">
import { Download, FileText, ImageOff, X } from "lucide-vue-next";
import { computed } from "vue";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string;
    type?: string;
    url?: string;
    text?: string;
    /** Show a remove action in the header. */
    removable?: boolean;
    class?: string;
  }>(),
  { type: "", removable: false },
);

const emit = defineEmits<{ remove: [] }>();

const isImage = computed(
  () => props.type.startsWith("image/") && Boolean(props.url),
);
const isText = computed(() => props.text !== undefined);
</script>

<template>
  <Card
    data-slot="file-preview"
    :class="cn('max-w-md overflow-hidden', props.class)"
  >
    <CardHeader class="gap-1">
      <div class="flex items-start justify-between gap-3">
        <div class="grid gap-1">
          <CardTitle class="text-sm">{{ name }}</CardTitle>
          <p class="text-xs text-muted-foreground">
            <span v-if="size">{{ size }} · </span>
            {{ type || "Unknown type" }}
          </p>
        </div>
        <button
          v-if="removable"
          type="button"
          :aria-label="`Remove ${name}`"
          class="-mr-1 shrink-0 rounded-sm p-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          @click="emit('remove')"
        >
          <X class="size-4" aria-hidden />
        </button>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <img
        v-if="isImage"
        :src="url"
        :alt="name"
        class="max-h-64 w-full rounded-md border object-contain"
      />
      <pre
        v-else-if="isText"
        class="max-h-48 overflow-auto whitespace-pre-wrap rounded-md border bg-muted/40 p-3 text-xs"
      >{{ text }}</pre>
      <div
        v-else
        class="flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-muted/30 text-sm text-muted-foreground"
      >
        <ImageOff v-if="type.startsWith('image/')" class="size-5" aria-hidden />
        <FileText v-else class="size-5" aria-hidden />
        <span>No preview available</span>
      </div>
      <a
        v-if="url"
        :href="url"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Download class="size-4" aria-hidden />
        Download
      </a>
    </CardContent>
  </Card>
</template>
