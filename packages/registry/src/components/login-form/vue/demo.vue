<script setup lang="ts">
import { LoginForm } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <LoginForm class="rounded-xl border bg-background p-6" />
    <LoginForm
      class="rounded-xl border bg-background p-6"
      error="Invalid email or password."
      loading
    />
  </div>
</template>
