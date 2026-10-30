<script setup lang="ts">
import { Bold, Italic, Underline } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { defaultValue: "", placeholder: "Write something…", disabled: false },
);

const emit = defineEmits<{ change: [html: string]; "update:modelValue": [html: string] }>();

const commands = [
  { command: "bold", label: "Bold", Icon: Bold },
  { command: "italic", label: "Italic", Icon: Italic },
  { command: "underline", label: "Underline", Icon: Underline },
] as const;

const allowedTags = new Set([
  "P", "BR", "DIV", "SPAN", "STRONG", "B", "EM", "I", "U", "S",
  "UL", "OL", "LI", "A", "BLOCKQUOTE", "CODE", "PRE", "H1", "H2",
  "H3", "H4", "H5", "H6",
]);
const blockedTags = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED"]);
const allowedAttributes = new Set(["href", "target", "rel"]);

const editor = ref<HTMLElement | null>(null);
const empty = ref(
  props.defaultValue.replace(/<[^>]*>/g, "").trim().length === 0,
);

const showPlaceholder = computed(() => empty.value);

function sanitizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  for (const element of Array.from(doc.body.querySelectorAll("*"))) {
    if (blockedTags.has(element.tagName)) {
      element.remove();
      continue;
    }
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }
    for (const attribute of Array.from(element.attributes)) {
      if (!allowedAttributes.has(attribute.name)) {
        element.removeAttribute(attribute.name);
      }
    }
    if (
      element.tagName === "A" &&
      /^\s*javascript:/i.test(element.getAttribute("href") ?? "")
    ) {
      element.removeAttribute("href");
    }
  }

  return doc.body.innerHTML;
}

function syncValue() {
  const element = editor.value;
  if (!element) return;
  empty.value = (element.textContent ?? "").trim().length === 0;
  const html = element.innerHTML;
  emit("change", html);
  emit("update:modelValue", html);
}

function applyCommand(command: "bold" | "italic" | "underline") {
  if (props.disabled) return;
  editor.value?.focus();
  document.execCommand(command);
  syncValue();
}

onMounted(() => {
  if (editor.value) editor.value.innerHTML = sanitizeHtml(props.defaultValue);
});
</script>

<template>
  <div
    data-slot="rich-text"
    :class="
      cn(
        'overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring',
        disabled && 'opacity-60',
        props.class,
      )
    "
  >
    <div
      role="toolbar"
      aria-label="Text formatting"
      class="flex items-center gap-1 border-b p-1"
    >
      <button
        v-for="item in commands"
        :key="item.command"
        type="button"
        :aria-label="item.label"
        :disabled="disabled"
        class="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        @mousedown.prevent
        @click="applyCommand(item.command)"
      >
        <component :is="item.Icon" class="size-4" aria-hidden="true" />
      </button>
    </div>
    <div class="relative">
      <span
        v-if="showPlaceholder"
        aria-hidden="true"
        class="pointer-events-none absolute left-3 top-2 text-sm text-muted-foreground"
      >
        {{ placeholder }}
      </span>
      <div
        ref="editor"
        role="textbox"
        aria-label="Rich text editor"
        aria-multiline="true"
        :contenteditable="!disabled"
        class="min-h-24 px-3 py-2 text-sm leading-relaxed outline-none"
        @input="syncValue"
      />
    </div>
  </div>
</template>
