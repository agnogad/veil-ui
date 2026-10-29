<script setup lang="ts">
import { Logo } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <Logo name="Veil UI">
      <template #mark>
        <span
          class="grid size-full place-items-center rounded-md bg-foreground text-xs font-bold text-background"
        >
          V
        </span>
      </template>
    </Logo>

    <Logo name="Veil UI" href="/">
      <template #mark>
        <span
          class="grid size-full place-items-center rounded-md bg-gradient-to-br from-primary to-primary/60 text-xs font-bold text-primary-foreground"
        >
          V
        </span>
      </template>
    </Logo>

    <div class="flex items-center gap-6">
      <Logo name="Veil" size="sm">
        <template #mark>
          <span
            class="grid size-full place-items-center rounded-md bg-foreground text-[10px] font-bold text-background"
          >
            V
          </span>
        </template>
      </Logo>
      <Logo name="Veil" size="md">
        <template #mark>
          <span
            class="grid size-full place-items-center rounded-md bg-foreground text-xs font-bold text-background"
          >
            V
          </span>
        </template>
      </Logo>
      <Logo name="Veil" size="lg">
        <template #mark>
          <span
            class="grid size-full place-items-center rounded-md bg-foreground text-sm font-bold text-background"
          >
            V
          </span>
        </template>
      </Logo>
    </div>
  </div>
</template>
