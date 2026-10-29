<script setup lang="ts">
import { MobileNavbar } from "./index";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Components", href: "/docs/components" },
  { label: "Pricing", href: "/pricing" },
];
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <MobileNavbar title="Veil UI" :links="links" class="rounded-md border" />
    <MobileNavbar title="Veil UI" :links="links" class="rounded-md border">
      <template #actions>
        <button
          type="button"
          class="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
        >
          Sign in
        </button>
      </template>
    </MobileNavbar>
  </div>
</template>
