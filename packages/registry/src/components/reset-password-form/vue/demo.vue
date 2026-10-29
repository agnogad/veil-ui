<script setup lang="ts">
import { ResetPasswordForm } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <ResetPasswordForm class="rounded-xl border bg-background p-6" />
    <ResetPasswordForm
      class="rounded-xl border bg-background p-6"
      description="Pick something you have not used before."
      loading
    />
  </div>
</template>
