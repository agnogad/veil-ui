<script setup lang="ts">
import { ref } from "vue";

import { CodeEditor } from "./index";

const sample = `export function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

const code = ref("const total = 42;\n");

const config = `{
  "theme": "dark",
  "strict": true
}`;
</script>

<template>
  <div class="grid max-w-xl gap-6">
    <CodeEditor language="typescript" :default-value="sample" label="Function source" />
    <div class="flex flex-col gap-3">
      <CodeEditor v-model:value="code" language="javascript" label="Snippet" />
      <p class="text-sm text-muted-foreground">{{ code.length }} characters</p>
    </div>
    <CodeEditor
      language="json"
      read-only
      label="Configuration"
      :default-value="config"
    />
  </div>
</template>
