// Split Button — toggles the menu, keeps focus inside and closes on outside click.
document.querySelectorAll('[data-slot="split-button"]').forEach((root) => {
  const trigger = root.querySelector("[data-split-trigger]");
  const menu = root.querySelector("[data-split-menu]");
  if (!(trigger instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) {
    return;
  }

  const items = [...menu.querySelectorAll('[role="menuitem"]')];

  function close(refocus = true) {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (refocus) trigger.focus();
  }

  function open() {
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    items[0]?.focus();
  }

  trigger.addEventListener("click", () => {
    if (menu.hidden) open();
    else close();
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const index = items.indexOf(document.activeElement);
    const next =
      event.key === "ArrowDown"
        ? items[(index + 1) % items.length]
        : items[(index - 1 + items.length) % items.length];
    next?.focus();
  });

  items.forEach((item) => {
    item.addEventListener("click", () => close());
  });

  document.addEventListener("pointerdown", (event) => {
    if (menu.hidden) return;
    if (!root.contains(event.target)) close(false);
  });
});
