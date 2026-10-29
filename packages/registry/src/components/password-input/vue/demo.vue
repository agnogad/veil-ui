<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";

import { PasswordInput } from "./index";

const password = ref("");
</script>

<template>
  <div class="grid gap-6">
    <PasswordInput
      placeholder="Enter your password"
      autocomplete="current-password"
      aria-label="Password"
      class="max-w-sm"
    />

    <div class="grid w-full max-w-sm gap-1.5">
      <Label for="password">Password</Label>
      <PasswordInput
        id="password"
        v-model="password"
        placeholder="At least 12 characters"
        autocomplete="new-password"
      />
      <p class="text-sm text-muted-foreground">
        Use a mix of letters, numbers and symbols.
      </p>
    </div>

    <PasswordInput
      disabled
      model-value="veil-secret"
      aria-label="Password"
      class="max-w-sm"
    />
  </div>
</template>
