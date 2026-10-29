<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  MobileDialog,
  MobileDialogClose,
  MobileDialogContent,
  MobileDialogDescription,
  MobileDialogFooter,
  MobileDialogHeader,
  MobileDialogTitle,
  MobileDialogTrigger,
} from "./index";

const open = ref(false);
const name = ref("Acme dashboard");
</script>

<template>
  <MobileDialog v-model:open="open">
    <MobileDialogTrigger as-child>
      <Button variant="outline">Rename project</Button>
    </MobileDialogTrigger>
    <MobileDialogContent class="max-w-sm">
      <MobileDialogHeader>
        <MobileDialogTitle>Rename project</MobileDialogTitle>
        <MobileDialogDescription>
          Pick a short, recognizable name.
        </MobileDialogDescription>
      </MobileDialogHeader>
      <div class="grid gap-2">
        <Label for="mobile-dialog-name">Project name</Label>
        <Input id="mobile-dialog-name" v-model="name" />
      </div>
      <MobileDialogFooter>
        <MobileDialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </MobileDialogClose>
        <MobileDialogClose as-child>
          <Button>Save</Button>
        </MobileDialogClose>
      </MobileDialogFooter>
    </MobileDialogContent>
  </MobileDialog>
</template>
