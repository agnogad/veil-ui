<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./index";
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">Hover or focus me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to your library</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
