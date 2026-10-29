<script setup lang="ts">
import { ForgotPasswordForm } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <ForgotPasswordForm class="rounded-xl border bg-background p-6" />
    <ForgotPasswordForm
      class="rounded-xl border bg-background p-6"
      description="We will email a secure link that expires in 30 minutes."
      success-message="Check your inbox — the link expires in 30 minutes."
    />
  </div>
</template>
