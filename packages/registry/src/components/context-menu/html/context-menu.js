// Context menu — dependency-free right-click menu for [data-context-menu].
document.querySelectorAll("[data-context-menu]").forEach((root) => {
  const area = root.querySelector("[data-context-menu-area]");
  const menu = root.querySelector('[role="menu"]');
  if (!area || !menu) return;

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
    const onTransitionEnd = (event) => {
      if (event.target !== menu) return;
      if (!["opacity", "scale"].includes(event.propertyName)) return;
      menu.removeEventListener("transitionend", onTransitionEnd);
      finalizeClose();
    };
    menu.addEventListener("transitionend", onTransitionEnd);
    closeTimer = window.setTimeout(finalizeClose, 200);
    if (restoreFocus) area.focus();
  };

  const openAt = (x, y) => {
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    menu.hidden = false;
    menu.dataset.state = "closed";

    // Measure once visible, then clamp inside the viewport.
    const { offsetWidth: width, offsetHeight: height } = menu;
    const left = Math.min(x, window.innerWidth - width - 8);
    const top = Math.min(y, window.innerHeight - height - 8);
    menu.style.left = `${Math.max(8, left)}px`;
    menu.style.top = `${Math.max(8, top)}px`;

    void menu.offsetWidth;
    menu.dataset.state = "open";
    items[0]?.focus();
  };

  area.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    openAt(event.clientX, event.clientY);
  });

  area.addEventListener("keydown", (event) => {
    if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
      event.preventDefault();
      const rect = area.getBoundingClientRect();
      openAt(rect.left + 16, rect.top + 16);
    }
  });

  document.addEventListener("click", (event) => {
    if (isOpen() && !menu.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) close(true);
  });

  window.addEventListener("scroll", () => close(), true);
  window.addEventListener("resize", () => close());

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
