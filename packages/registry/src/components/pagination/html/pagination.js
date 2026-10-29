// Pagination — renders page ranges with ellipsis and tracks the current page.
document.querySelectorAll("[data-pagination]").forEach((nav) => {
  const list = nav.querySelector("[data-page-list]");
  const prev = nav.querySelector("[data-page-prev]");
  const next = nav.querySelector("[data-page-next]");
  if (!list) return;

  const total = Number(nav.dataset.totalPages) || 1;
  const siblingCount = 1;
  let current = Math.min(
    Math.max(Number(nav.dataset.currentPage) || 1, 1),
    total,
  );

  const pageClasses =
    "inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  const getPages = (page, totalPages, siblings) => {
    const totalNumbers = siblings * 2 + 5;
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftSibling = Math.max(page - siblings, 1);
    const rightSibling = Math.min(page + siblings, totalPages);
    const showLeftDots = leftSibling > 3;
    const showRightDots = rightSibling < totalPages - 2;
    const count = 3 + siblings * 2;

    if (!showLeftDots && showRightDots) {
      return [
        ...Array.from({ length: count }, (_, index) => index + 1),
        "ellipsis",
        totalPages,
      ];
    }

    if (showLeftDots && !showRightDots) {
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
  };

  const go = (nextPage) => {
    if (nextPage < 1 || nextPage > total || nextPage === current) return;
    current = nextPage;
    render();
  };

  const createPageButton = (value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.page = String(value);
    button.textContent = String(value);
    button.setAttribute("aria-label", `Go to page ${value}`);
    button.className = pageClasses;
    if (value === current) {
      button.setAttribute("aria-current", "page");
      button.classList.add(
        "border-foreground",
        "bg-foreground",
        "text-background",
        "hover:bg-foreground",
        "hover:text-background",
      );
    }
    button.addEventListener("click", () => go(value));
    return button;
  };

  const render = () => {
    list.replaceChildren();
    getPages(current, total, siblingCount).forEach((token) => {
      if (token === "ellipsis") {
        const span = document.createElement("span");
        span.setAttribute("aria-hidden", "true");
        span.className = "px-1 text-sm text-muted-foreground";
        span.textContent = "…";
        list.append(span);
        return;
      }
      list.append(createPageButton(token));
    });
    if (prev) prev.disabled = current <= 1;
    if (next) next.disabled = current >= total;
    nav.dataset.currentPage = String(current);
  };

  prev?.addEventListener("click", () => go(current - 1));
  next?.addEventListener("click", () => go(current + 1));

  render();
});
