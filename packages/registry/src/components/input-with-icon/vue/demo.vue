<script setup lang="ts">
import { Mail, Search } from "lucide-vue-next";

import { InputWithIcon } from "./index";
</script>

<template>
  <div class="grid w-full max-w-xs gap-4">
    <InputWithIcon
      :icon="Mail"
      type="email"
      aria-label="Email"
      placeholder="you@example.com"
    />
    <InputWithIcon
      :icon="Search"
      position="right"
      aria-label="Search"
      placeholder="Search…"
    />
  </div>
</template>
