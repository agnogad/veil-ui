"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

type PageToken = number | "ellipsis";

function getPages(
  page: number,
  totalPages: number,
  siblingCount: number,
): PageToken[] {
  const totalNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftDots = leftSibling > 3;
  const showRightDots = rightSibling < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const count = 3 + siblingCount * 2;
    return [
      ...Array.from({ length: count }, (_, index) => index + 1),
      "ellipsis",
      totalPages,
    ];
  }

  if (showLeftDots && !showRightDots) {
    const count = 3 + siblingCount * 2;
    return [
      1,
      "ellipsis",
      ...Array.from(
        { length: count },
        (_, index) => totalPages - count + 1 + index,
      ),
    ];
  }

  return [
    1,
    "ellipsis",
    ...Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, index) => leftSibling + index,
    ),
    "ellipsis",
    totalPages,
  ];
}

interface PaginationProps extends React.ComponentProps<"nav"> {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  label?: string;
}

function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  label = "Pagination",
  className,
  ...props
}: PaginationProps) {
  const pages = getPages(page, totalPages, siblingCount);
  const buttonClasses =
    "inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  function go(next: number) {
    if (next < 1 || next > totalPages || next === page) return;
    onPageChange?.(next);
  }

  return (
    <nav
      data-slot="pagination"
      aria-label={label}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className={cn(buttonClasses, "border-transparent")}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>
      {pages.map((token, index) =>
        token === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden
            className="px-1 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={token}
            type="button"
            aria-label={`Go to page ${token}`}
            aria-current={token === page ? "page" : undefined}
            onClick={() => go(token)}
            className={cn(
              buttonClasses,
              token === page &&
                "border-foreground bg-foreground text-background hover:bg-foreground hover:text-background",
            )}
          >
            {token}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        className={cn(buttonClasses, "border-transparent")}
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps };
