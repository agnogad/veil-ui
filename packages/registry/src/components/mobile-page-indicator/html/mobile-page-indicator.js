// Mobile Page Indicator — dependency-free dot selection for [data-mobile-page-indicator] blocks.
document.querySelectorAll("[data-mobile-page-indicator]").forEach((indicator) => {
  const dots = [...indicator.querySelectorAll("[data-page-indicator-dot]")];
  const status = indicator.querySelector("[data-page-status]");
  const label = indicator.parentElement?.querySelector("[data-page-label]");

  const select = (dot) => {
    const index = Number(dot.dataset.index ?? 0);
    for (const candidate of dots) {
      const active = candidate === dot;
      candidate.setAttribute("data-active", String(active));
      if (active) {
        candidate.setAttribute("aria-current", "true");
      } else {
        candidate.removeAttribute("aria-current");
      }
    }
    if (status) status.textContent = `Page ${index + 1} of ${dots.length}`;
    if (label) label.textContent = `Slide ${index + 1}`;
  };

  dots.forEach((dot) => dot.addEventListener("click", () => select(dot)));
});
