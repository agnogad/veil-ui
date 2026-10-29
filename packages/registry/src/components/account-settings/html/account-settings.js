// Account Settings — dependency-free section switching for [data-account-settings] blocks.
document.querySelectorAll("[data-account-settings]").forEach((root) => {
  const tabs = [...root.querySelectorAll("[data-account-tab]")];
  const panels = [...root.querySelectorAll("[data-account-section]")];

  const select = (id) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.accountTab === id;
      tab.dataset.active = String(active);
      if (active) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.accountSection !== id;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => select(tab.dataset.accountTab));
  });
});
