"use client";

import { useState } from "react";

import { ColorPicker } from "./index";

export function ColorPickerBasic() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="flex flex-col gap-3">
      <ColorPicker value={color} onValueChange={setColor} />
      <p className="text-sm text-muted-foreground">Accent: {color}</p>
    </div>
  );
}

export function ColorPickerPresets() {
  return (
    <ColorPicker
      label="Brand color"
      defaultValue="#22c55e"
      presets={["#0f172a", "#14b8a6", "#22c55e", "#f59e0b", "#e11d48"]}
    />
  );
}

export function ColorPickerDisabled() {
  return <ColorPicker disabled defaultValue="#64748b" label="Locked color" />;
}
