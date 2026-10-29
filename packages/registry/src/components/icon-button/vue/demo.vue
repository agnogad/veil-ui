<script setup lang="ts">
import {
  Bell,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
} from "lucide-vue-next";

import { IconButton } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <IconButton aria-label="Notifications">
      <Bell />
    </IconButton>
    <IconButton variant="secondary" aria-label="Settings">
      <Settings />
    </IconButton>
    <IconButton variant="outline" aria-label="More options">
      <MoreHorizontal />
    </IconButton>
    <IconButton variant="ghost" aria-label="More options">
      <MoreHorizontal />
    </IconButton>
    <IconButton variant="destructive" aria-label="Delete">
      <Trash2 />
    </IconButton>
  </div>

  <div class="mt-3 flex flex-wrap items-center gap-2">
    <IconButton size="sm" aria-label="Add">
      <Plus />
    </IconButton>
    <IconButton aria-label="Add">
      <Plus />
    </IconButton>
    <IconButton size="lg" aria-label="Add">
      <Plus />
    </IconButton>
    <IconButton as-child variant="outline" aria-label="Open settings">
      <a href="/docs/theming">
        <Settings />
      </a>
    </IconButton>
  </div>
</template>
