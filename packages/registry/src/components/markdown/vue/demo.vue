<script setup lang="ts">
import { Markdown } from "./index";

const notes = `## Release notes

Ship **accessible** components with \`npx veil-ui add\`.

- Copy the source
- Own the code
- Keep the styles

> No wrapper library, no lock-in.
`;

const table = `| Component | Status |
| --- | --- |
| Button | Stable |
| Markdown | New |

~~Legacy wrapper~~ replaced by **source files**.
`;
</script>

<template>
  <div class="grid gap-6">
    <Markdown class="max-w-prose">{{ notes }}</Markdown>
    <Markdown class="max-w-prose">{{ table }}</Markdown>
  </div>
</template>
