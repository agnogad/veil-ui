<script setup lang="ts">
import { ArrowRight, Loader2, Mail, Plus } from "lucide-vue-next";

import { Button } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Delete</Button>
    <Button variant="link">Learn more</Button>
  </div>

  <div class="mt-4 flex flex-wrap items-center gap-2">
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon" aria-label="Add item">
      <Plus />
    </Button>
    <Button>
      <Mail /> Send invite
    </Button>
    <Button variant="outline">
      Continue <ArrowRight />
    </Button>
  </div>

  <div class="mt-4 flex flex-wrap items-center gap-2">
    <Button disabled>
      <Loader2 class="animate-spin" />
      Deploying
    </Button>
    <Button as-child>
      <a href="/docs">Read the docs</a>
    </Button>
  </div>
</template>
