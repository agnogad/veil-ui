<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

const open = ref(false);
const notifications = [
  "Your invoice was paid.",
  "New comment on “Design tokens”.",
  "Weekly digest is ready.",
];
</script>

<template>
  <Drawer v-model:open="open">
    <DrawerTrigger as-child>
      <Button variant="outline">Open notifications</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Notifications</DrawerTitle>
        <DrawerDescription>
          You have 3 unread notifications from this week.
        </DrawerDescription>
      </DrawerHeader>
      <ul class="flex flex-col gap-3 text-sm">
        <li
          v-for="notification in notifications"
          :key="notification"
          class="rounded-md border p-3"
        >
          {{ notification }}
        </li>
      </ul>
      <DrawerFooter>
        <DrawerClose as-child>
          <Button variant="outline">Mark all as read</Button>
        </DrawerClose>
        <DrawerClose as-child>
          <Button>Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
