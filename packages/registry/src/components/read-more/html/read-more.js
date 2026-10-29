// Read More — dependency-free expand and collapse behavior.
document.querySelectorAll("[data-read-more]").forEach((root) => {
  const content = root.querySelector("[data-read-more-content]");
  const toggle = root.querySelector("[data-read-more-toggle]");
  if (!content || !toggle) return;

  const moreLabel = toggle.dataset.moreLabel || "Read more";
  const lessLabel = toggle.dataset.lessLabel || "Show less";

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    const nextExpanded = !expanded;
    const clamp = content.dataset.clamp || `line-clamp-${root.dataset.lines || 3}`;

    toggle.setAttribute("aria-expanded", String(nextExpanded));
    toggle.textContent = nextExpanded ? lessLabel : moreLabel;

    clamp.split(" ").forEach((className) => {
      content.classList.toggle(className, !nextExpanded);
    });
  });
});
