// Tab — dependency-free behavior for [data-tab] blocks.
document.querySelectorAll("[data-tab]").forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  if (tabs.length === 0) return;

  const select = (tab, focus = false) => {
    for (const candidate of tabs) {
      const active = candidate === tab;
      candidate.setAttribute("aria-selected", String(active));
      candidate.dataset.active = String(active);
      candidate.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(candidate.dataset.tabTarget);
      if (panel) panel.hidden = !active;
    }
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key !== "ArrowRight" && key !== "ArrowLeft") return;
      event.preventDefault();
      const offset = key === "ArrowRight" ? 1 : -1;
      select(tabs[(index + offset + tabs.length) % tabs.length], true);
    });
  });

  const initial =
    tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0];
  select(initial);
});
