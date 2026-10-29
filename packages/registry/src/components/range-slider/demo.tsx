"use client";

import { useState } from "react";

import { RangeSlider } from "./index";

export function RangeSliderBasic() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <RangeSlider
        value={range}
        onValueChange={setRange}
        max={100}
        step={5}
        aria-label="Price range"
      />
      <p className="text-sm text-muted-foreground">
        {range[0]} – {range[1]}
      </p>
    </div>
  );
}
