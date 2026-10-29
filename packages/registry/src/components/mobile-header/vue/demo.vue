<script setup lang="ts">
import { Share2, SlidersHorizontal } from "lucide-vue-next";

import { Button } from "@/components/ui/button";

import { MobileHeader } from "./index";
</script>

<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <div class="w-full overflow-hidden rounded-lg border">
      <MobileHeader title="Project settings" subtitle="Acme workspace" :sticky="false">
        <template #actions>
          <Button size="icon" variant="ghost" aria-label="Share project">
            <Share2 />
          </Button>
        </template>
      </MobileHeader>
      <div class="h-24 bg-muted/20" />
    </div>

    <div class="w-full overflow-hidden rounded-lg border">
      <MobileHeader title="Billing" :sticky="false" :on-back="() => {}">
        <template #actions>
          <Button size="icon" variant="ghost" aria-label="Filters">
            <SlidersHorizontal />
          </Button>
        </template>
      </MobileHeader>
      <div class="h-24 bg-muted/20" />
    </div>
  </div>
</template>
