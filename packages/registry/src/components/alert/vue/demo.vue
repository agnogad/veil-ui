<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "./index";
</script>

<template>
  <div class="grid max-w-lg gap-4">
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can invite up to three teammates on the free plan.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTitle>Deployment failed</AlertTitle>
      <AlertDescription>
        The build exited with code 1. Check the logs for the failing step.
      </AlertDescription>
    </Alert>
  </div>
</template>
