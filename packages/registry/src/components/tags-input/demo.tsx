"use client";

import { useState } from "react";

import { TagsInput } from "./index";

export function TagsInputBasic() {
  const [tags, setTags] = useState<string[]>(["design", "react"]);

  return (
    <div className="flex max-w-md flex-col gap-3">
      <TagsInput value={tags} onValueChange={setTags} label="Skills" />
      <p className="text-sm text-muted-foreground">
        {tags.length} tag{tags.length === 1 ? "" : "s"} selected
      </p>
    </div>
  );
}

export function TagsInputMaxTags() {
  return (
    <TagsInput
      className="max-w-md"
      label="Topics"
      placeholder="Up to 3 topics"
      maxTags={3}
      defaultValue={["accessibility"]}
    />
  );
}

export function TagsInputDisabled() {
  return (
    <TagsInput
      className="max-w-md"
      label="Locked keywords"
      defaultValue={["read-only", "archived"]}
      disabled
    />
  );
}
