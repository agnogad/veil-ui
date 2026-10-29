// Mobile Toolbar — dependency-free toggle for [data-mobile-toolbar] blocks.
document.querySelectorAll("[data-mobile-toolbar]").forEach((toolbar) => {
  toolbar.querySelectorAll("[data-toolbar-item]").forEach((item) => {
    item.addEventListener("click", () => {
      const next = item.getAttribute("data-active") !== "true";
      item.setAttribute("data-active", String(next));
      item.setAttribute("aria-pressed", String(next));
    });
  });
});
