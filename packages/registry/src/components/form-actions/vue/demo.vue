<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { FormActions } from "./index";
</script>

<template>
  <div class="w-full max-w-md">
    <FormActions align="between">
      <Button variant="ghost">Delete draft</Button>
      <div class="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Publish</Button>
      </div>
    </FormActions>
  </div>

  <div class="mt-8 w-full max-w-md">
    <FormActions align="between">
      <p class="text-sm text-muted-foreground">
        Changes apply to every environment.
      </p>
      <Button>Update</Button>
    </FormActions>
  </div>

  <div class="mt-8 w-full max-w-md">
    <FormActions>
      <Button variant="outline">Cancel</Button>
      <Button>Save changes</Button>
    </FormActions>
  </div>
</template>
