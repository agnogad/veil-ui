"use client";

import { useState } from "react";

import { InfiniteScroll } from "./index";

const pageSize = 5;

function makePage(page: number) {
  return Array.from({ length: pageSize }, (_, index) => {
    const number = page * pageSize + index + 1;
    return `Activity item ${number}`;
  });
}

export function InfiniteScrollBasic() {
  const [pages, setPages] = useState([makePage(0)]);
  const [loading, setLoading] = useState(false);
  const hasMore = pages.length < 3;

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setPages((current) => [...current, makePage(current.length)]);
      setLoading(false);
    }, 400);
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      className="max-h-72 w-full max-w-sm overflow-y-auto rounded-lg border p-3"
    >
      {pages.flat().map((item) => (
        <div key={item} className="rounded-md border bg-background p-3 text-sm">
          {item}
        </div>
      ))}
    </InfiniteScroll>
  );
}

export function InfiniteScrollEndState() {
  return (
    <InfiniteScroll
      hasMore={false}
      onLoadMore={() => {}}
      className="w-full max-w-sm rounded-lg border p-3"
      endMessage="No more results."
    >
      {["First result", "Second result"].map((item) => (
        <div key={item} className="rounded-md border p-3 text-sm">
          {item}
        </div>
      ))}
    </InfiniteScroll>
  );
}
