"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface InfiniteScrollProps extends React.ComponentProps<"div"> {
  hasMore: boolean;
  loading?: boolean;
  onLoadMore: () => void;
  loadingMessage?: React.ReactNode;
  endMessage?: React.ReactNode;
}

function InfiniteScroll({
  className,
  children,
  hasMore,
  loading = false,
  onLoadMore,
  loadingMessage = "Loading more…",
  endMessage = "You have reached the end.",
  ...props
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div
      data-slot="infinite-scroll"
      className={cn("grid gap-3", className)}
      {...props}
    >
      {children}
      <div
        ref={sentinelRef}
        aria-live="polite"
        className="flex min-h-10 items-center justify-center text-xs text-muted-foreground"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
            {loadingMessage}
          </span>
        ) : hasMore ? (
          <span className="sr-only">Scroll for more content</span>
        ) : (
          endMessage
        )}
      </div>
    </div>
  );
}

export { InfiniteScroll };
export type { InfiniteScrollProps };
