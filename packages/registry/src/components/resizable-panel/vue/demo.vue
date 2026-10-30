<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./index";
</script>

<template>
  <div class="grid gap-6">
    <ResizablePanelGroup orientation="horizontal" class="h-40 w-full max-w-lg rounded-md border">
      <ResizablePanel default-size="35%">
        <div class="flex size-full items-center justify-center p-4 text-sm">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel default-size="65%">
        <div class="flex size-full items-center justify-center bg-muted/20 p-4 text-sm">Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>

    <ResizablePanelGroup orientation="vertical" class="h-52 w-full max-w-lg rounded-md border">
      <ResizablePanel default-size="50%">
        <div class="flex size-full items-center justify-center p-4 text-sm">Top</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel default-size="50%">
        <div class="flex size-full items-center justify-center bg-muted/20 p-4 text-sm">Bottom</div>
      </ResizablePanel>
    </ResizablePanelGroup>

    <ResizablePanelGroup orientation="horizontal" class="h-40 w-full max-w-lg rounded-md border">
      <ResizablePanel default-size="50%" min-size="20%">
        <div class="flex size-full items-center justify-center p-4 text-sm">Panel A</div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel default-size="50%" min-size="20%">
        <div class="flex size-full items-center justify-center bg-muted/20 p-4 text-sm">Panel B</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
