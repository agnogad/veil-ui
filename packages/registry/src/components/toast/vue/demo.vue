<script setup lang="ts">
import { defineComponent, h } from "vue";

import { Button } from "@/components/ui/button";

import { Toaster, ToastProvider, useToast } from "./index";

const ToastTriggers = defineComponent({
  setup() {
    const { toast } = useToast();

    return () =>
      h("div", { class: "flex flex-wrap gap-2" }, [
        h(
          Button,
          {
            variant: "outline",
            onClick: () =>
              toast({
                title: "Changes saved",
                description: "Your profile was updated.",
              }),
          },
          () => "Show toast",
        ),
        h(
          Button,
          {
            onClick: () =>
              toast({
                title: "Deployment finished",
                description: "Production is live.",
                variant: "success",
              }),
          },
          () => "Success",
        ),
        h(
          Button,
          {
            variant: "destructive",
            onClick: () =>
              toast({
                title: "Upload failed",
                description: "The file exceeded the size limit.",
                variant: "destructive",
              }),
          },
          () => "Destructive",
        ),
        h(
          Button,
          {
            variant: "outline",
            onClick: () =>
              toast({
                title: "Message archived",
                description: "You can restore it from the archive.",
                action: {
                  label: "Undo",
                  onClick: () => toast({ title: "Message restored" }),
                },
              }),
          },
          () => "With action",
        ),
      ]);
  },
});
</script>

<template>
  <ToastProvider :duration="5000">
    <ToastTriggers />
    <Toaster />
  </ToastProvider>
</template>
