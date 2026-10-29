<script setup lang="ts">
import { Inbox } from "lucide-vue-next";

import { Button } from "@/components/ui/button";

import { Center } from "./index";
</script>

<template>
  <Center class="h-32 w-full rounded-md border border-dashed">
    <span class="text-sm text-muted-foreground">Centered content</span>
  </Center>

  <Center class="mt-4 h-40 w-full rounded-md border bg-muted/20">
    <div class="text-center">
      <p class="text-sm font-medium">Sign in to continue</p>
      <Button size="sm" class="mt-3">Sign in</Button>
    </div>
  </Center>

  <Center
    class="mt-4 h-40 w-full flex-col gap-2 rounded-md border border-dashed"
  >
    <Inbox class="size-5 text-muted-foreground" aria-hidden="true" />
    <p class="text-sm text-muted-foreground">Nothing here yet</p>
  </Center>
</template>
