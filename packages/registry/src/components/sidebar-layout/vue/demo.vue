<script setup lang="ts">
import { SidebarLayout } from "./index";

const navItems = ["Introduction", "Installation", "Theming"];
</script>

<template>
  <div class="grid gap-4">
    <div class="w-full rounded-md border p-2">
      <SidebarLayout>
        <template #sidebar>
          <nav aria-label="Docs" class="grid gap-1 text-sm">
            <span v-for="(item, index) in navItems" :key="item" :class="index === 0 ? 'rounded-md bg-muted px-2 py-1.5 font-medium' : 'rounded-md px-2 py-1.5 text-muted-foreground'">{{ item }}</span>
          </nav>
        </template>
        <h2 class="text-lg font-semibold">Introduction</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          The content column flows next to a sticky sidebar.
        </p>
      </SidebarLayout>
    </div>

    <div class="w-full rounded-md border p-2">
      <SidebarLayout>
        <template #sidebar>
          <nav aria-label="Docs" class="grid gap-1 text-sm text-muted-foreground">
            <span v-for="item in navItems" :key="item" class="rounded-md px-2 py-1.5">{{ item }}</span>
          </nav>
        </template>
        <template #header>
          <h2 class="text-lg font-semibold">Theming</h2>
        </template>
        <p class="text-sm text-muted-foreground">
          Use the header slot for the page title and actions.
        </p>
      </SidebarLayout>
    </div>

    <div class="w-full rounded-md border p-2">
      <SidebarLayout sidebar-position="end" sidebar-size="sm">
        <template #sidebar>
          <div class="rounded-md border bg-muted/20 p-3 text-sm">
            On this page
          </div>
        </template>
        <p class="text-sm text-muted-foreground">
          End-aligned asides work well for table-of-contents panes.
        </p>
      </SidebarLayout>
    </div>
  </div>
</template>
