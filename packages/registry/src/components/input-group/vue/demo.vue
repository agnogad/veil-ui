<script setup lang="ts">
import { AtSign, Copy, Globe } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { InputGroup, InputGroupAddon } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupAddon>
        <AtSign aria-hidden="true" />
      </InputGroupAddon>
      <Input placeholder="you@example.com" aria-label="Email" />
    </InputGroup>

    <InputGroup>
      <InputGroupAddon>veil.dev/</InputGroupAddon>
      <Input placeholder="project-name" aria-label="Project slug" />
    </InputGroup>

    <InputGroup>
      <InputGroupAddon>
        <Globe aria-hidden="true" />
      </InputGroupAddon>
      <Input placeholder="staging" aria-label="Environment" />
      <InputGroupAddon align="inline-end">
        <kbd
          class="pointer-events-none inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground"
        >
          ⌘E
        </kbd>
      </InputGroupAddon>
    </InputGroup>

    <InputGroup>
      <Input
        model-value="veil.dev/invite/9f2"
        aria-label="Invite link"
        placeholder="Invite link"
      />
      <InputGroupAddon align="inline-end">
        <Button
          variant="ghost"
          size="icon"
          class="mr-1 size-7"
          aria-label="Copy invite link"
        >
          <Copy aria-hidden="true" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
