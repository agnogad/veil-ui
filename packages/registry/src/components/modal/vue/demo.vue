<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";

const open = ref(false);
const email = ref("");
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">Invite teammate</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite teammate</DialogTitle>
        <DialogDescription>
          They will receive an email with a link to join your workspace.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-2">
        <div class="grid gap-2">
          <Label for="modal-invite-email">Email</Label>
          <Input
            id="modal-invite-email"
            v-model="email"
            type="email"
            placeholder="teammate@example.com"
          />
        </div>
        <div class="grid gap-2">
          <Label for="modal-invite-role">Role</Label>
          <Input id="modal-invite-role" placeholder="Developer" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose as-child>
          <Button>Send invite</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
