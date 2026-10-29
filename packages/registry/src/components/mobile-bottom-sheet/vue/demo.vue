<script setup lang="ts">
import { Camera, FileText, ImageIcon, Link } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  MobileBottomSheet,
  MobileBottomSheetClose,
  MobileBottomSheetContent,
  MobileBottomSheetDescription,
  MobileBottomSheetHeader,
  MobileBottomSheetTitle,
  MobileBottomSheetTrigger,
} from "./index";

const open = ref(false);

const actions = [
  { label: "Take a photo", icon: Camera },
  { label: "Photo library", icon: ImageIcon },
  { label: "Choose a file", icon: FileText },
  { label: "Paste a link", icon: Link },
];
</script>

<template>
  <MobileBottomSheet v-model:open="open">
    <MobileBottomSheetTrigger as-child>
      <Button variant="outline">Add attachment</Button>
    </MobileBottomSheetTrigger>
    <MobileBottomSheetContent>
      <MobileBottomSheetHeader>
        <MobileBottomSheetTitle>Add attachment</MobileBottomSheetTitle>
        <MobileBottomSheetDescription>
          Choose a source for your attachment.
        </MobileBottomSheetDescription>
      </MobileBottomSheetHeader>
      <div class="grid gap-2">
        <MobileBottomSheetClose
          v-for="action in actions"
          :key="action.label"
          as-child
        >
          <Button variant="secondary" class="justify-start">
            <component :is="action.icon" aria-hidden="true" />
            {{ action.label }}
          </Button>
        </MobileBottomSheetClose>
      </div>
    </MobileBottomSheetContent>
  </MobileBottomSheet>
</template>
