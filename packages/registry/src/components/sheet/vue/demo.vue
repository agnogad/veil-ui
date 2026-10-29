<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./index";

const open = ref(false);
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="outline">Share</Button>
    </SheetTrigger>
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Share this document</SheetTitle>
        <SheetDescription>
          Anyone with the link can view this document.
        </SheetDescription>
      </SheetHeader>
      <p class="rounded-md border bg-muted/40 p-3 text-sm break-all">
        https://veil-ui.dev/d/9f2a
      </p>
      <div class="grid gap-2 sm:grid-cols-3">
        <Button variant="outline">Copy link</Button>
        <Button variant="outline">Email</Button>
        <Button variant="outline">Message</Button>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button variant="ghost">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
