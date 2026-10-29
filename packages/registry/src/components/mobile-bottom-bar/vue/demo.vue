<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { MobileBottomBar } from "./index";
</script>

<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <div class="w-full overflow-hidden rounded-lg border">
      <div class="h-24 bg-muted/20" />
      <MobileBottomBar :sticky="false">
        <Button variant="outline" class="flex-1">Cancel</Button>
        <Button class="flex-1">Save changes</Button>
      </MobileBottomBar>
    </div>

    <div class="w-full overflow-hidden rounded-lg border">
      <div class="space-y-2 p-4">
        <p class="text-sm font-medium">Order summary</p>
        <p class="text-xs text-muted-foreground">
          Subtotal $129 · Shipping calculated at checkout
        </p>
      </div>
      <MobileBottomBar :sticky="false">
        <div class="flex-1">
          <p class="text-xs text-muted-foreground">Total</p>
          <p class="text-sm font-semibold">$129.00</p>
        </div>
        <Button>Checkout</Button>
      </MobileBottomBar>
    </div>
  </div>
</template>
