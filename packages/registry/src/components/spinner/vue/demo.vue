<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { Spinner } from "./index";
</script>

<template>
  <div class="flex items-center gap-4">
    <Spinner size="sm" />
    <Spinner />
    <Spinner size="lg" />
  </div>
  <Button disabled class="mt-4">
    <Spinner size="sm" label="Deploying" />
    Deploying
  </Button>
</template>
