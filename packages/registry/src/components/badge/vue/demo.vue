<script setup lang="ts">
import { Badge } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Badge>Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="muted">Muted</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge as-child>
      <a href="/changelog">v1.0.0</a>
    </Badge>
  </div>
</template>
