<script setup lang="ts">
import { Button } from "@/components/ui/button";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./index";
</script>

<template>
  <div class="flex items-center gap-6">
    <HoverCard>
      <HoverCardTrigger as-child>
        <Button variant="link">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent aria-label="Deployment details">
        <p class="text-sm font-medium">Deployment v2.4.0</p>
        <p class="mt-1 text-sm text-muted-foreground">
          Built 12 minutes ago from the main branch.
        </p>
      </HoverCardContent>
    </HoverCard>

    <HoverCard :open-delay="100">
      <HoverCardTrigger as-child>
        <Button variant="ghost">@ada</Button>
      </HoverCardTrigger>
      <HoverCardContent aria-label="Profile preview" class="w-72">
        <div class="flex gap-3">
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold"
          >
            AL
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-sm font-semibold">Ada Lovelace</p>
            <p class="text-xs text-muted-foreground">@ada</p>
            <p class="text-sm">
              Writes about design systems and leaps of logic.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
