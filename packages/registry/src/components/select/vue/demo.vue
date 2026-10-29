<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./index";

const fruit = ref("apple");
const framework = ref("react");
</script>

<template>
  <div class="grid gap-6">
    <div class="grid w-full max-w-xs gap-2">
      <Label for="fruit">Favorite fruit</Label>
      <Select v-model="fruit">
        <SelectTrigger id="fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <p class="text-sm text-muted-foreground">Selected: {{ fruit }}</p>
    </div>

    <Select v-model="framework">
      <SelectTrigger aria-label="Framework" class="max-w-xs">
        <SelectValue placeholder="Pick a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="go">Go</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select disabled>
      <SelectTrigger aria-label="Disabled select" class="max-w-xs">
        <SelectValue placeholder="Unavailable" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
