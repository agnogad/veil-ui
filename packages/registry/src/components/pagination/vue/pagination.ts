export type PageToken = number | "ellipsis";

export function getPages(
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

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  label?: string;
  class?: string;
}
