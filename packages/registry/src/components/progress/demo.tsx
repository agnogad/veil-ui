"use client";

import { Progress } from "./index";

export function ProgressBasic() {
  return <Progress value={40} className="w-full max-w-sm" aria-label="Upload" />;
}

export function ProgressWithLabel() {
  const value = 68;

  return (
    <div className="w-full max-w-sm space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Uploading assets</span>
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} aria-label="Uploading assets" />
    </div>
  );
}

export function ProgressSizes() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Progress value={30} className="h-1" aria-label="Small" />
      <Progress value={60} className="h-1.5" aria-label="Default" />
      <Progress value={90} className="h-2.5" aria-label="Large" />
    </div>
  );
}
