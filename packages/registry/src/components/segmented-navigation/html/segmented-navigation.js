// Segmented navigation — click and arrow-key selection with roving tabindex.
document.querySelectorAll("[data-segmented]").forEach((group) => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];

  const select = (selected) => {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      if (!tab.disabled) select(tab);
    });

    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      for (let step = 1; step <= tabs.length; step += 1) {
        const next = (index + direction * step + tabs.length) % tabs.length;
        const candidate = tabs[next];
        if (!candidate.disabled) {
          select(candidate);
          candidate.focus();
          return;
        }
      }
    });
  });

  const initial = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
  if (initial) select(initial);
});
