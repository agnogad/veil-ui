<script setup lang="ts">
import { Paragraph } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <Paragraph>
      Components are added as source files. Edit them, delete them, shape them
      around your product.
    </Paragraph>

    <Paragraph tone="muted">
      The CLI resolves dependencies, writes the files and installs what is
      missing.
    </Paragraph>

    <Paragraph size="lg" class="max-w-prose">
      A monochrome component collection for React. Built on Radix UI and
      Tailwind CSS v4, copied into your project with one command.
    </Paragraph>
  </div>
</template>
