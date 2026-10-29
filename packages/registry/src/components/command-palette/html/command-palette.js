// Command palette — dependency-free dialog, filtering, shortcuts and keyboard selection.
document.querySelectorAll("[data-palette-open]").forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.paletteOpen);
  if (!dialog) return;

  const input = dialog.querySelector("[data-palette-input]");
  const list = dialog.querySelector('[role="listbox"]');
  const items = [...dialog.querySelectorAll("[data-palette-item]")];
  const groups = [...dialog.querySelectorAll("[data-palette-group]")];
  const empty = dialog.querySelector("[data-palette-empty]");
  const triggers = [...document.querySelectorAll(`[data-palette-open="${dialog.id}"]`)];

  let visible = items;
  let activeIndex = 0;

  const setActive = (index) => {
    if (!visible.length) {
      input.removeAttribute("aria-activedescendant");
      return;
    }
    activeIndex = (index + visible.length) % visible.length;
    visible.forEach((item, itemIndex) => {
      item.setAttribute("aria-selected", itemIndex === activeIndex ? "true" : "false");
    });
    input.setAttribute("aria-activedescendant", visible[activeIndex].id || "");
    visible[activeIndex].scrollIntoView({ block: "nearest" });
  };

  const filter = () => {
    const query = input.value.trim().toLowerCase();
    visible = items.filter((item) => {
      const label = (item.dataset.paletteLabel || item.textContent || "").toLowerCase();
      const match = !query || label.includes(query);
      item.hidden = !match;
      return match;
    });

    groups.forEach((group) => {
      const hasVisible = [...group.querySelectorAll("[data-palette-item]")].some(
        (item) => !item.hidden,
      );
      group.hidden = !hasVisible;
    });

    if (empty) empty.hidden = visible.length > 0;
    setActive(0);
  };

  const close = () => {
    dialog.close();
  };

  const open = () => {
    input.value = "";
    filter();
    if (!dialog.open) dialog.showModal();
    input.focus();
    triggers.forEach((element) => element.setAttribute("aria-expanded", "true"));
  };

  const select = (item) => {
    trigger.dispatchEvent(
      new CustomEvent("palette:select", {
        bubbles: true,
        detail: { label: item.dataset.paletteLabel },
      }),
    );
    close();
  };

  items.forEach((item, index) => {
    item.id = `command-palette-option-${index}`;
    item.addEventListener("click", () => select(item));
    item.addEventListener("mousemove", () => {
      const visibleIndex = visible.indexOf(item);
      if (visibleIndex !== -1) setActive(visibleIndex);
    });
  });

  triggers.forEach((element) => {
    element.setAttribute("aria-haspopup", "dialog");
    element.setAttribute("aria-expanded", "false");
    element.addEventListener("click", open);
  });

  document.addEventListener("keydown", (event) => {
    const isShortcut =
      (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (!isShortcut) return;
    event.preventDefault();
    if (dialog.open) close();
    else open();
  });

  input.addEventListener("input", filter);
  input.addEventListener("keydown", (event) => {
    if (!visible.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(visible.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(visible[activeIndex]);
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener("close", () => {
    input.value = "";
    filter();
    triggers.forEach((element) => element.setAttribute("aria-expanded", "false"));
    trigger.focus();
  });

  if (list) list.setAttribute("aria-labelledby", input.getAttribute("aria-label"));
});
