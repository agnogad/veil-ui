<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./index";
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="grid h-32 w-64 place-items-center rounded-md border border-dashed text-sm text-muted-foreground"
    >
      Right-click this area
    </ContextMenuTrigger>
    <ContextMenuContent class="min-w-52">
      <ContextMenuLabel>Edit</ContextMenuLabel>
      <ContextMenuItem>
        Copy
        <span class="ml-auto text-xs tracking-widest text-muted-foreground">
          ⌘C
        </span>
      </ContextMenuItem>
      <ContextMenuItem>
        Paste
        <span class="ml-auto text-xs tracking-widest text-muted-foreground">
          ⌘V
        </span>
      </ContextMenuItem>
      <ContextMenuItem disabled>
        Paste and match style
        <span class="ml-auto text-xs tracking-widest text-muted-foreground">
          ⇧⌘V
        </span>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem inset>Select all</ContextMenuItem>
      <ContextMenuItem inset variant="destructive">Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
