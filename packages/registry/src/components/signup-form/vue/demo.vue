<script setup lang="ts">
import { SignupForm } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <SignupForm class="rounded-xl border bg-background p-6" />
    <SignupForm
      class="rounded-xl border bg-background p-6"
      error="An account with this email already exists."
    />
  </div>
</template>
