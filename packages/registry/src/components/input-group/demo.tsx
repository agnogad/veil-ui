"use client";

import { AtSign, Copy, Globe } from "lucide-react";

import { IconButton } from "../icon-button/index";
import { Input } from "../input/index";
import { Kbd } from "../kbd/index";
import { InputGroup, InputGroupAddon } from "./index";

export function InputGroupWithIcon() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <AtSign />
      </InputGroupAddon>
      <Input placeholder="you@example.com" aria-label="Email" />
    </InputGroup>
  );
}

export function InputGroupWithText() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <InputGroup>
        <InputGroupAddon>veil.dev/</InputGroupAddon>
        <Input placeholder="project-name" aria-label="Project slug" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Globe />
        </InputGroupAddon>
        <Input placeholder="staging" aria-label="Environment" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘E</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function InputGroupWithButton() {
  return (
    <InputGroup className="max-w-sm">
      <Input placeholder="Invite link" defaultValue="veil.dev/invite/9f2" aria-label="Invite link" />
      <InputGroupAddon align="inline-end">
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Copy invite link"
          className="mr-1"
        >
          <Copy />
        </IconButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
