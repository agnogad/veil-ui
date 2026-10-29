<script setup lang="ts">
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-vue-next";
import { ref } from "vue";

import { ToggleGroup, ToggleGroupItem } from "./index";

const alignment = ref("left");
const formatting = ref<string[]>(["bold"]);
</script>

<template>
  <div class="grid gap-6">
    <div class="grid gap-2">
      <ToggleGroup v-model="alignment" type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
      <p class="text-sm text-muted-foreground">Align: {{ alignment }}</p>
    </div>

    <ToggleGroup
      v-model="formatting"
      type="multiple"
      aria-label="Formatting"
    >
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>

    <ToggleGroup
      type="single"
      variant="outline"
      default-value="center"
      aria-label="Outline alignment"
    >
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>

    <div class="flex flex-col gap-2">
      <ToggleGroup type="single" size="sm" aria-label="Small alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" aria-label="Large alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </div>
</template>
