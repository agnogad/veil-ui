<script setup lang="ts">
import { CodeBlock } from "./index";

const snippet = `import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button>Save changes</Button>;
}`;
</script>

<template>
  <div class="grid gap-4">
    <CodeBlock :code="snippet" language="tsx" class="max-w-lg" />
    <CodeBlock
      :code="snippet"
      language="tsx"
      filename="save-button.tsx"
      class="max-w-lg"
    />
    <CodeBlock
      :code="snippet"
      filename="save-button.tsx"
      show-line-numbers
      class="max-w-lg"
    />
  </div>
</template>
