<script setup lang="ts">
import { Grid } from "@/components/ui/grid";

import { GridItem } from "./index";
</script>

<template>
  <Grid :cols="12">
    <GridItem :col-span="8">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Main</div>
    </GridItem>
    <GridItem :col-span="4">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Aside</div>
    </GridItem>
  </Grid>

  <Grid :cols="12" class="mt-4">
    <GridItem :col-span="3" :row-span="2">
      <div class="h-full rounded-md border bg-muted/20 p-4 text-sm">Sidebar</div>
    </GridItem>
    <GridItem :col-span="9">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Header</div>
    </GridItem>
    <GridItem :col-span="9">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Content</div>
    </GridItem>
  </Grid>

  <Grid :cols="12" class="mt-4">
    <GridItem :col-span="12">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Full width</div>
    </GridItem>
    <GridItem :col-span="6">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Half</div>
    </GridItem>
    <GridItem :col-span="6">
      <div class="rounded-md border bg-muted/20 p-4 text-sm">Half</div>
    </GridItem>
  </Grid>
</template>
