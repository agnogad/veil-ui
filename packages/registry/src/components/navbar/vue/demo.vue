<script setup lang="ts">
import { Navbar } from "./index";
</script>

<template>
  <div class="grid w-full gap-4">
    <Navbar class="rounded-md border">
      <span class="text-sm font-semibold">Veil UI</span>
      <nav aria-label="Main" class="ml-auto flex items-center gap-4 text-sm">
        <a href="/docs" class="text-muted-foreground hover:text-foreground">
          Docs
        </a>
        <a
          href="/components"
          class="text-muted-foreground hover:text-foreground"
        >
          Components
        </a>
      </nav>
    </Navbar>

    <div class="relative h-40 overflow-hidden rounded-md border">
      <Navbar sticky class="border-x-0 border-t-0">
        <span class="text-sm font-semibold">Sticky bar</span>
        <span class="ml-auto text-xs text-muted-foreground">
          Stays at the top while the page scrolls
        </span>
      </Navbar>
      <div class="h-64 overflow-y-auto bg-muted/30 p-4 text-xs text-muted-foreground">
        Scrollable content area
      </div>
    </div>
  </div>
</template>
