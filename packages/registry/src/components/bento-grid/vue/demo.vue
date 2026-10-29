<script setup lang="ts">
import { Blocks, Keyboard, Palette, Rocket } from "lucide-vue-next";
import { h } from "vue";

import { BentoGrid } from "./index";

const GridPreview = () =>
  h(
    "div",
    { class: "grid grid-cols-3 gap-2" },
    Array.from({ length: 6 }, () =>
      h("div", { class: "h-10 rounded-md border bg-muted/40" }),
    ),
  );

const items = [
  {
    icon: Blocks,
    title: "Everything composes",
    description:
      "Primitives, patterns and page sections share the same tokens and spacing scale.",
    media: GridPreview,
  },
  {
    icon: Palette,
    title: "Themeable",
    description: "Swap brand colors in one place.",
  },
  {
    icon: Keyboard,
    title: "Keyboard first",
    description: "Focus rings and shortcuts included.",
  },
  {
    icon: Rocket,
    title: "Fast setup",
    description: "One CLI command per component.",
  },
];

const compactItems = [
  {
    title: "Copy-paste registry",
    description: "Own the source from day one.",
  },
  {
    title: "Accessible defaults",
    description: "Tested with axe in CI.",
  },
  {
    title: "Docs included",
    description: "Every component ships with examples.",
  },
];
</script>

<template>
  <div class="grid gap-6">
    <BentoGrid class="w-full max-w-5xl" :items="items" />
    <BentoGrid class="w-full max-w-3xl" :items="compactItems" />
  </div>
</template>
