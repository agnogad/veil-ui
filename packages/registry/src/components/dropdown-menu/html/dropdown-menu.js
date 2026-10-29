// Dropdown menu — dependency-free behavior for [data-dropdown] blocks.
document.querySelectorAll("[data-dropdown]").forEach((root) => {
  const trigger = root.querySelector("[data-dropdown-trigger]");
  const menu = root.querySelector('[role="menu"]');
  if (!trigger || !menu) return;

  const items = [...menu.querySelectorAll('[role="menuitem"]')];

  const close = (restoreFocus = false) => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) trigger.focus();
  };

  const open = (focusFirst = false) => {
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    if (focusFirst) items[0]?.focus();
  };

  trigger.addEventListener("click", () => {
    if (menu.hidden) open();
    else close(true);
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      open(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) close(true);
  });

  items.forEach((item, index) => {
    item.addEventListener("click", () => close(true));
    item.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(index + 1) % items.length].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        items[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1].focus();
      }
    });
  });
});
