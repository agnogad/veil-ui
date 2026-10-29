<script setup lang="ts">
import { AppShell } from "./index";

const navItems = ["Overview", "Projects", "Settings"];
</script>

<template>
  <div class="grid gap-4">
    <div class="h-72 w-full overflow-hidden rounded-md border">
      <AppShell>
        <template #header>
          <div class="flex h-12 items-center px-4 text-sm font-medium">Workspace</div>
        </template>
        <template #sidebar>
          <nav aria-label="Main" class="grid gap-1 p-3 text-sm">
            <span v-for="(item, index) in navItems" :key="item" :class="index === 0 ? 'rounded-md bg-muted px-2 py-1.5 font-medium' : 'rounded-md px-2 py-1.5 text-muted-foreground'">{{ item }}</span>
          </nav>
        </template>
        <div class="p-4 text-sm text-muted-foreground">Main content area.</div>
      </AppShell>
    </div>

    <div class="h-64 w-full overflow-hidden rounded-md border">
      <AppShell>
        <template #header>
          <div class="flex h-12 items-center justify-between px-4">
            <span class="text-sm font-medium">Dashboard</span>
            <span class="text-xs text-muted-foreground">3 updates</span>
          </div>
        </template>
        <div class="grid gap-2 p-4 text-sm text-muted-foreground">
          <p>No sidebar in this variant.</p>
        </div>
      </AppShell>
    </div>

    <div class="h-64 w-full overflow-hidden rounded-md border">
      <AppShell sidebar-width="lg">
        <template #header>
          <div class="flex h-12 items-center px-4 text-sm font-medium">Workspace</div>
        </template>
        <template #sidebar>
          <nav aria-label="Main" class="grid gap-1 p-3 text-sm">
            <span v-for="item in navItems" :key="item" class="rounded-md px-2 py-1.5 text-muted-foreground">{{ item }}</span>
          </nav>
        </template>
        <div class="p-4 text-sm text-muted-foreground">A wider sidebar for dense navigation.</div>
      </AppShell>
    </div>
  </div>
</template>
