<script setup lang="ts">
import { LinkButton } from "./index";
</script>

<template>
  <p class="text-sm text-muted-foreground">
    By continuing you agree to our
    <LinkButton href="/docs/terms">terms of service</LinkButton> and
    <LinkButton href="/docs/privacy">privacy policy</LinkButton>.
  </p>

  <div class="mt-4 flex flex-wrap items-center gap-4">
    <LinkButton href="https://react.dev" external>
      Read the React docs
    </LinkButton>
    <LinkButton href="/docs" variant="muted">Changelog</LinkButton>
    <LinkButton href="/docs" variant="destructive">Delete account</LinkButton>
    <LinkButton href="/docs" underline>Underlined</LinkButton>
  </div>
</template>
