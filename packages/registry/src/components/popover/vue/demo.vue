<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Popover, PopoverContent, PopoverTrigger } from "./index";
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent class="grid gap-2">
      <p class="text-sm font-medium">Dimensions</p>
      <p class="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
      <div class="grid gap-1">
        <Label for="popover-width" class="text-xs text-muted-foreground">
          Width
        </Label>
        <Input id="popover-width" type="number" value="320" />
      </div>
    </PopoverContent>
  </Popover>
</template>
