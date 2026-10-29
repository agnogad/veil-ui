<script setup lang="ts">
import { MegaMenu } from "./index";

const items = [
  {
    label: "Products",
    columns: [
      {
        title: "Build",
        links: [
          {
            label: "Components",
            description: "42 primitives",
            href: "#components",
          },
          { label: "Blocks", description: "Page sections", href: "#blocks" },
        ],
      },
      {
        title: "Ship",
        links: [
          {
            label: "CLI",
            description: "Copy files in one command",
            href: "#cli",
          },
          {
            label: "Registry",
            description: "Machine-readable source",
            href: "#registry",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Docs", href: "#docs" },
          { label: "Changelog", href: "#changelog" },
        ],
      },
    ],
  },
];
</script>

<template>
  <MegaMenu aria-label="Main" :items="items" />
</template>
