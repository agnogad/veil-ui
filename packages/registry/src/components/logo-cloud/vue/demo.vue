<script setup lang="ts">
import { LogoCloud } from "./index";

const brands = [
  { name: "Acme" },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Umbrella" },
];

const linked = [
  { name: "Acme", href: "https://example.com/acme" },
  { name: "Globex", href: "https://example.com/globex" },
  { name: "Initech", href: "https://example.com/initech" },
];
</script>

<template>
  <div class="grid gap-10">
    <LogoCloud :items="brands" />
    <LogoCloud :items="linked" :columns="3" />
  </div>
</template>
