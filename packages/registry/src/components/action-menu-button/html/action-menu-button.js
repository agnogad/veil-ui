// Action menu button — dependency-free open/close behavior for [data-action-menu].
document.querySelectorAll("[data-action-menu]").forEach((root) => {
  const trigger = root.querySelector("[data-action-menu-trigger]");
  const menu = root.querySelector('[role="menu"]');
  if (!trigger || !menu) return;

  const items = [...menu.querySelectorAll('[role="menuitem"]')];
  let closeTimer;

  const isOpen = () => menu.dataset.state === "open";

  const finalizeClose = () => {
    if (isOpen()) return;
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    menu.hidden = true;
  };

  const close = (restoreFocus = false) => {
    if (!isOpen()) return;
    menu.dataset.state = "closed";
    trigger.setAttribute("aria-expanded", "false");
    const onTransitionEnd = (event) => {
      if (event.target !== menu) return;
      if (!["opacity", "scale", "translate"].includes(event.propertyName)) return;
      menu.removeEventListener("transitionend", onTransitionEnd);
      finalizeClose();
    };
    menu.addEventListener("transitionend", onTransitionEnd);
    // Fallback for reduced motion and browsers that skip the transition.
    closeTimer = window.setTimeout(finalizeClose, 200);
    if (restoreFocus) trigger.focus();
  };

  const open = (focusFirst = false) => {
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    menu.hidden = false;
    // Commit the closed styles before flipping state so the enter transition runs.
    void menu.offsetWidth;
    menu.dataset.state = "open";
    trigger.setAttribute("aria-expanded", "true");
    if (focusFirst) items[0]?.focus();
  };

  trigger.addEventListener("click", () => {
    if (isOpen()) close(true);
    else open();
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
    if (event.key === "Escape" && isOpen()) close(true);
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
