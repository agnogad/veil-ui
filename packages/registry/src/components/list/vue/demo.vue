<script setup lang="ts">
import { List, ListItem } from "./index";
</script>

<template>
  <div class="grid gap-6">
    <List>
      <ListItem>Copy the source</ListItem>
      <ListItem>Own the code</ListItem>
      <ListItem>Keep the styles</ListItem>
    </List>
    <List as="ol" variant="decimal">
      <ListItem>Run the init command</ListItem>
      <ListItem>Add a component</ListItem>
      <ListItem>Edit it to fit</ListItem>
    </List>
    <List variant="none" spacing="lg">
      <ListItem class="text-sm font-medium">Design tokens</ListItem>
      <ListItem class="text-sm font-medium">Primitives</ListItem>
      <ListItem class="text-sm font-medium">Blocks</ListItem>
    </List>
  </div>
</template>
