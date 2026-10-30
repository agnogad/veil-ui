<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { StickyBottomCta } from "./index";
</script>

<template>
  <div class="h-56 w-full max-w-sm overflow-y-auto rounded-lg border">
    <div class="space-y-2 p-4 text-sm text-muted-foreground">
      <p class="font-medium text-foreground">Plan details</p>
      <p>Unlimited projects, 10 seats, priority support.</p>
      <p>Cancel anytime from your dashboard.</p>
      <p>Taxes calculated at checkout.</p>
    </div>
    <StickyBottomCta label="$24 / month" description="Billed monthly">
      <template #action>
        <Button>Start trial</Button>
      </template>
    </StickyBottomCta>
  </div>
</template>
