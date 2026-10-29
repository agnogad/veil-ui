"use client";

import { useState } from "react";

import { MobilePageIndicator } from "./index";

export function MobilePageIndicatorBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border bg-muted/20 p-6">
      <div className="grid h-24 place-items-center text-sm text-muted-foreground">
        Slide 2
      </div>
      <MobilePageIndicator count={4} index={1} />
    </div>
  );
}

export function MobilePageIndicatorInteractive() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border bg-muted/20 p-6">
      <div className="grid h-24 place-items-center text-sm text-muted-foreground">
        Slide {index + 1}
      </div>
      <MobilePageIndicator count={3} index={index} onSelect={setIndex} />
    </div>
  );
}
