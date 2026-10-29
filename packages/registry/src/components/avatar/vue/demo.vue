<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "./index";
</script>

<template>
  <div class="flex items-center gap-3">
    <Avatar size="lg">
      <AvatarImage src="https://github.com/shadcn.png" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
    <Avatar size="sm">
      <AvatarFallback>+3</AvatarFallback>
    </Avatar>
  </div>
</template>
