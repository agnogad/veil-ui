<script setup lang="ts">
import { ListItem, ListView } from "./index";
</script>

<template>
  <ListView label="Team members" class="max-w-md">
    <ListItem title="Mira Chen" description="Product" />
    <ListItem title="Owen Park" description="Engineering" />
    <ListItem title="Lena Ortiz" description="Design" />
  </ListView>
</template>
