"use client";

import { useState } from "react";

import { Slider } from "./index";

export function SliderBasic() {
  const [value, setValue] = useState([40]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        aria-label="Volume"
      />
      <p className="text-sm text-muted-foreground">Volume: {value[0]}</p>
    </div>
  );
}

export function SliderStep() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={10}
      aria-label="Opacity"
      className="max-w-sm"
    />
  );
}

export function SliderDisabled() {
  return (
    <Slider
      defaultValue={[30]}
      disabled
      aria-label="Disabled slider"
      className="max-w-sm"
    />
  );
}
