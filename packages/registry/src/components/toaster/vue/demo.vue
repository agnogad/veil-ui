<script setup lang="ts">
import { defineComponent, h } from "vue";

import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

import { Toaster } from "./index";

const ToasterTrigger = defineComponent({
  setup() {
    const { toast } = useToast();

    return () =>
      h("div", { class: "flex flex-wrap gap-2" }, [
        h(
          Button,
          {
            onClick: () =>
              toast({
                title: "Saved",
                description: "Everything is up to date.",
                variant: "success",
              }),
          },
          () => "Show toast",
        ),
        h(
          Button,
          {
            variant: "outline",
            onClick: () =>
              toast({
                title: "Upload failed",
                description: "Check your connection and try again.",
                variant: "destructive",
              }),
          },
          () => "Destructive",
        ),
      ]);
  },
});
</script>

<template>
  <ToastProvider>
    <ToasterTrigger />
    <Toaster />
  </ToastProvider>
</template>
