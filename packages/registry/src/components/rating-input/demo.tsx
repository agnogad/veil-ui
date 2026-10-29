"use client";

import { useState } from "react";

import { RatingInput } from "./index";

export function RatingInputBasic() {
  const [rating, setRating] = useState(3);

  return (
    <div className="flex flex-col gap-2">
      <RatingInput
        value={rating}
        onValueChange={setRating}
        label="Product rating"
        showValue
      />
      <p className="text-sm text-muted-foreground">
        {rating === 0 ? "No rating yet" : `${rating} out of 5 stars`}
      </p>
    </div>
  );
}

export function RatingInputReadonly() {
  return (
    <div className="flex flex-col gap-2">
      <RatingInput defaultValue={4} readOnly label="Average rating" showValue />
      <p className="text-sm text-muted-foreground">Based on 128 reviews</p>
    </div>
  );
}

export function RatingInputSizes() {
  return (
    <div className="flex flex-col gap-4">
      <RatingInput size="sm" defaultValue={2} label="Small rating" />
      <RatingInput size="md" defaultValue={3} label="Medium rating" />
      <RatingInput size="lg" defaultValue={5} label="Large rating" />
    </div>
  );
}
