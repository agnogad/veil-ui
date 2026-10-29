<script setup lang="ts">
import { PageShell } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <div class="h-72 w-full overflow-hidden rounded-md border">
      <PageShell>
        <template #header>
          <div class="py-3 text-sm font-medium">Site header</div>
        </template>
        <h1 class="text-lg font-semibold">Page title</h1>
        <p class="mt-2 text-sm text-muted-foreground">
          Content is centered and constrained by the shell.
        </p>
        <template #footer>
          <div class="text-xs text-muted-foreground">© 2026 Veil UI</div>
        </template>
      </PageShell>
    </div>

    <div class="h-64 w-full overflow-hidden rounded-md border">
      <PageShell size="sm">
        <template #header>
          <div class="py-3 text-sm">Docs</div>
        </template>
        <p class="text-sm text-muted-foreground">
          A narrow reading measure for documentation.
        </p>
      </PageShell>
    </div>

    <div class="h-64 w-full overflow-hidden rounded-md border">
      <PageShell size="full">
        <template #header>
          <div class="py-3 text-sm">App</div>
        </template>
        <p class="text-sm text-muted-foreground">
          A full-width shell for dashboards and data tables.
        </p>
      </PageShell>
    </div>
  </div>
</template>
