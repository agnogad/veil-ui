<script setup lang="ts">
import { Camera, FileText, ImageIcon, Link } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
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
  <BottomSheet v-model:open="open">
    <BottomSheetTrigger as-child>
      <Button variant="outline">Add attachment</Button>
    </BottomSheetTrigger>
    <BottomSheetContent>
      <BottomSheetHeader>
        <BottomSheetTitle>Add attachment</BottomSheetTitle>
        <BottomSheetDescription>
          Choose a source for your attachment.
        </BottomSheetDescription>
      </BottomSheetHeader>
      <div class="grid gap-2">
        <BottomSheetClose
          v-for="action in actions"
          :key="action.label"
          as-child
        >
          <Button variant="secondary" class="justify-start">
            <component :is="action.icon" aria-hidden="true" />
            {{ action.label }}
          </Button>
        </BottomSheetClose>
      </div>
    </BottomSheetContent>
  </BottomSheet>
</template>
