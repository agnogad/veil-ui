// Mobile Navbar — dependency-free toggle for [data-mobile-navbar] blocks.
document.querySelectorAll("[data-mobile-navbar]").forEach((root) => {
  const toggle = root.querySelector("[data-mobile-navbar-toggle]");
  const menu = root.querySelector("[data-mobile-navbar-menu]");
  if (!(toggle instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) return;

  const panel = menu.querySelector("[data-mobile-navbar-panel]");
  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      panel?.querySelector("a, button")?.focus();
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => setOpen(menu.hidden));

  menu
    .querySelectorAll("[data-mobile-navbar-close]")
    .forEach((button) => button.addEventListener("click", () => setOpen(false)));
  menu
    .querySelector("[data-mobile-navbar-overlay]")
    ?.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setOpen(false);
  });
});
