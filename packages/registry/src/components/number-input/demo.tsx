"use client";

import { useState } from "react";

import { Label } from "../label/index";
import { NumberInput } from "./index";

export function NumberInputBasic() {
  return (
    <NumberInput
      defaultValue={2}
      aria-label="Quantity"
      className="max-w-40"
    />
  );
}

export function NumberInputWithLabel() {
  const [seats, setSeats] = useState(3);

  return (
    <div className="grid w-full max-w-60 gap-1.5">
      <Label htmlFor="seats">Seats</Label>
      <NumberInput
        id="seats"
        value={seats}
        min={1}
        max={50}
        onValueChange={setSeats}
      />
      <p className="text-sm text-muted-foreground">
        {seats} {seats === 1 ? "seat" : "seats"} selected
      </p>
    </div>
  );
}

export function NumberInputRange() {
  return (
    <div className="flex items-center gap-3">
      <NumberInput
        defaultValue={5}
        min={0}
        max={10}
        aria-label="Retries"
        className="max-w-36"
      />
      <span className="text-sm text-muted-foreground">of 10 retries</span>
    </div>
  );
}

export function NumberInputDisabled() {
  return (
    <NumberInput
      disabled
      defaultValue={12}
      aria-label="Quantity"
      className="max-w-40"
    />
  );
}
