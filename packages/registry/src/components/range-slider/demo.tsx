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

export function RangeSliderSteps() {
  const [range, setRange] = useState([20, 60]);

  return (
    <div className="grid w-full max-w-sm gap-2">
      <RangeSlider
        value={range}
        onValueChange={setRange}
        min={0}
        max={100}
        step={20}
        aria-label="Budget range"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>
          Selected ${range[0]}–${range[1]}
        </span>
        <span>$100+</span>
      </div>
    </div>
  );
}
