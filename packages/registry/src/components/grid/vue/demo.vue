<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Grid } from "./index";
</script>

<template>
  <Grid :cols="3" class="w-full">
    <Card>
      <CardHeader>
        <CardTitle class="text-sm">Tokens</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        Colors, radius and typography.
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle class="text-sm">Components</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        Accessible building blocks.
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle class="text-sm">Blocks</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        Composed page sections.
      </CardContent>
    </Card>
  </Grid>

  <Grid :cols="4" gap="sm" class="mt-6 w-full">
    <div
      v-for="label in ['Requests', 'Errors', 'Latency', 'Uptime']"
      :key="label"
      class="rounded-md border p-3"
    >
      <p class="text-xs text-muted-foreground">{{ label }}</p>
      <p class="mt-1 text-lg font-semibold tracking-tight">99.9%</p>
    </div>
  </Grid>
</template>
