<script setup lang="ts">
import { Heading } from "./index";
</script>

<template>
  <div class="grid gap-6">
    <Heading>Own your interface.</Heading>

    <div class="grid gap-2">
      <Heading :level="1">Level one</Heading>
      <Heading :level="3">Level three</Heading>
      <Heading :level="6" tone="muted">Level six</Heading>
    </div>

    <div class="grid gap-2">
      <Heading :level="2" :size="5" weight="medium" tone="muted">
        A small h2 with a quiet tone
      </Heading>
      <Heading :level="6" :size="2">
        A large h6 for visual emphasis
      </Heading>
    </div>
  </div>
</template>
