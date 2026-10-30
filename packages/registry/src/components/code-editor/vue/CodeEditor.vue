<script setup lang="ts">
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    value?: string;
    defaultValue?: string;
    label?: string;
    language?: string;
    showLineNumbers?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: number;
    class?: string;
  }>(),
  {
    defaultValue: "",
    label: "Code editor",
    language: "plaintext",
    showLineNumbers: true,
    disabled: false,
    readOnly: false,
    rows: 10,
  },
);

const emit = defineEmits<{ "update:value": [value: string]; valueChange: [value: string] }>();

const internal = ref(props.defaultValue);
const area = ref<HTMLTextAreaElement | null>(null);
const gutter = ref<HTMLElement | null>(null);

const current = computed(() => props.value ?? internal.value);
const lines = computed(() => current.value.split("\n"));
const lineCount = computed(() => Math.max(lines.value.length, 1));

function commit(next: string) {
  if (props.value === undefined) internal.value = next;
  emit("update:value", next);
  emit("valueChange", next);
}

function onInput(event: Event) {
  commit((event.target as HTMLTextAreaElement).value);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== "Tab" || props.readOnly || props.disabled) return;
  event.preventDefault();
  const target = event.currentTarget as HTMLTextAreaElement;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  commit(`${current.value.slice(0, start)}  ${current.value.slice(end)}`);
  requestAnimationFrame(() => {
    target.selectionStart = start + 2;
    target.selectionEnd = start + 2;
  });
}
</script>

<template>
  <div
    data-slot="code-editor"
    :class="
      cn(
        'overflow-hidden rounded-lg border bg-muted/30 font-mono text-sm',
        disabled && 'opacity-60',
        props.class,
      )
    "
  >
    <div class="flex items-center justify-between border-b bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
      <span class="font-medium">{{ language }}</span>
      <span class="tabular-nums">
        {{ lineCount }} line{{ lineCount === 1 ? "" : "s" }} · {{ current.length }} chars
      </span>
    </div>
    <div class="flex max-h-96">
      <div
        v-if="showLineNumbers"
        ref="gutter"
        aria-hidden="true"
        class="shrink-0 select-none overflow-hidden border-r bg-muted/40 px-3 py-3 text-right leading-6 text-muted-foreground/70"
      >
        <div v-for="index in lineCount" :key="index">{{ index }}</div>
      </div>
      <textarea
        ref="area"
        :value="current"
        :rows="rows"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        wrap="off"
        :disabled="disabled"
        :readonly="readOnly"
        :aria-label="label"
        class="min-h-40 w-full resize-y bg-transparent px-3 py-3 leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        @input="onInput"
        @keydown="onKeydown"
        @scroll="
          (event) => {
            if (gutter) gutter.scrollTop = (event.currentTarget as HTMLTextAreaElement).scrollTop;
          }
        "
      />
    </div>
  </div>
</template>
