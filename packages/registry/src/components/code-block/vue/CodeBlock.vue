<script setup lang="ts">
import { Check, Copy } from "lucide-vue-next";
import { computed, onBeforeUnmount, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
    copyable?: boolean;
    class?: string;
  }>(),
  { showLineNumbers: false, copyable: true },
);

const copied = ref(false);
let timer: number | undefined;

const lines = computed(() => props.code.replace(/\n$/, "").split("\n"));
const hasCaption = computed(
  () => Boolean(props.filename || props.language || props.copyable),
);

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // Clipboard access can be denied; the code stays selectable.
  }
}

onBeforeUnmount(() => window.clearTimeout(timer));
</script>

<template>
  <figure
    data-slot="code-block"
    :class="cn('overflow-hidden rounded-lg border bg-muted/40', props.class)"
  >
    <figcaption
      v-if="hasCaption"
      class="flex items-center justify-between gap-3 border-b px-3 py-1.5"
    >
      <span class="truncate font-mono text-xs text-muted-foreground">
        {{ filename ?? language ?? "code" }}
      </span>
      <button
        v-if="copyable"
        type="button"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        class="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        @click="handleCopy"
      >
        <Check v-if="copied" class="size-3.5" aria-hidden="true" />
        <Copy v-else class="size-3.5" aria-hidden="true" />
      </button>
    </figcaption>
    <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono"><span
      v-if="showLineNumbers"
      class="grid"
    ><span
      v-for="(line, index) in lines"
      :key="index"
      class="grid grid-cols-[auto_1fr] gap-4"
    ><span
      aria-hidden="true"
      class="select-none text-right text-muted-foreground/60"
    >{{ index + 1 }}</span><span>{{ line || " " }}</span></span></span><template v-else>{{ code }}</template></code></pre>
  </figure>
</template>
