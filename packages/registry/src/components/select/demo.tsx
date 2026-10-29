"use client";

import { useState } from "react";

import { Label } from "../label/index";
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

export function SelectBasic() {
  const [fruit, setFruit] = useState("apple");

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="fruit">Favorite fruit</Label>
      <Select value={fruit} onValueChange={setFruit}>
        <SelectTrigger id="fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectGroups() {
  return (
    <Select defaultValue="react">
      <SelectTrigger aria-label="Framework" className="max-w-xs">
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
  );
}

export function SelectDisabled() {
  return (
    <Select disabled>
      <SelectTrigger aria-label="Disabled select" className="max-w-xs">
        <SelectValue placeholder="Unavailable" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
      </SelectContent>
    </Select>
  );
}
