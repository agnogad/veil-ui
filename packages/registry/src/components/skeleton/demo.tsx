"use client";

import { Skeleton } from "./index";

export function SkeletonBasic() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="w-full max-w-sm rounded-lg border p-5">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-3 h-3 w-2/3" />
      <div className="mt-6 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}
