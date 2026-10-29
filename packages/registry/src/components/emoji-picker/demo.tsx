"use client";

import { useState } from "react";

import { EmojiPicker } from "./index";

export function EmojiPickerBasic() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid gap-3">
      <EmojiPicker onSelect={setSelected} />
      <p className="text-sm text-muted-foreground">
        Selected: {selected ? <span className="text-lg">{selected}</span> : "none"}
      </p>
    </div>
  );
}

export function EmojiPickerCompact() {
  return <EmojiPicker className="max-w-xs" label="Reaction" />;
}
