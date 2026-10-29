<script setup lang="ts">
import { Bell, Home, Settings } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  MobileDrawer,
  MobileDrawerClose,
  MobileDrawerContent,
  MobileDrawerDescription,
  MobileDrawerFooter,
  MobileDrawerHeader,
  MobileDrawerTitle,
  MobileDrawerTrigger,
} from "./index";

const open = ref(false);

const links = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Alerts", href: "#alerts", icon: Bell },
  { label: "Settings", href: "#settings", icon: Settings },
];
</script>

<template>
  <MobileDrawer v-model:open="open">
    <MobileDrawerTrigger as-child>
      <Button variant="outline">Open menu</Button>
    </MobileDrawerTrigger>
    <MobileDrawerContent side="left">
      <MobileDrawerHeader>
        <MobileDrawerTitle>Workspace</MobileDrawerTitle>
        <MobileDrawerDescription>Jump to a section.</MobileDrawerDescription>
      </MobileDrawerHeader>
      <nav class="flex flex-col gap-1 text-sm">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-accent"
        >
          <component :is="link.icon" class="size-4" aria-hidden="true" />
          {{ link.label }}
        </a>
      </nav>
      <MobileDrawerFooter>
        <MobileDrawerClose as-child>
          <Button variant="outline">Close</Button>
        </MobileDrawerClose>
      </MobileDrawerFooter>
    </MobileDrawerContent>
  </MobileDrawer>
</template>
