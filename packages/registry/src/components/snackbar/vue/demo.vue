<script setup lang="ts">
import { defineComponent, h } from "vue";

import { Button } from "@/components/ui/button";

import { Snackbar, SnackbarProvider, useSnackbar } from "./index";

const SnackbarTriggers = defineComponent({
  setup() {
    const { toast } = useSnackbar();

    return () =>
      h("div", { class: "flex flex-wrap gap-2" }, [
        h(
          Button,
          {
            onClick: () =>
              toast({
                title: "Message sent",
                description: "We'll get back to you shortly.",
              }),
          },
          () => "Send message",
        ),
        h(
          Button,
          {
            variant: "outline",
            onClick: () =>
              toast({
                title: "Message archived",
                description: "You can restore it from Settings.",
                action: { label: "Undo" },
              }),
          },
          () => "Archive message",
        ),
      ]);
  },
});
</script>

<template>
  <SnackbarProvider>
    <SnackbarTriggers />
    <Snackbar />
  </SnackbarProvider>
</template>
