<script setup lang="ts">
import { Link } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 text-sm">
    <Link href="/docs">Read the documentation</Link>
    <Link href="https://github.com/agnogad/veil-ui" external>
      View the repository
    </Link>
    <Link href="/docs/changelog" tone="muted">Changelog</Link>
  </div>
</template>
