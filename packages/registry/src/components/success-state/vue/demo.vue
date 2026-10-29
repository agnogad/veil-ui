<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { SuccessState } from "./index";
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <SuccessState title="Changes saved" />
    <SuccessState
      title="Payment complete"
      description="A receipt was sent to your inbox."
    >
      <template #action>
        <Button variant="outline" size="sm">View receipt</Button>
      </template>
    </SuccessState>
  </div>
</template>
