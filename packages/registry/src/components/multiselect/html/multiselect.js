// Multiselect — filtering, checked summary and clear.
document.querySelectorAll("[data-multiselect]").forEach((root) => {
  const trigger = root.querySelector("[data-multiselect-trigger]");
  const menu = root.querySelector("[data-multiselect-menu]");
  const label = root.querySelector("[data-multiselect-label]");
  const search = root.querySelector("[data-multiselect-search]");
  const empty = root.querySelector("[data-multiselect-empty]");
  const clear = root.querySelector("[data-multiselect-clear]");
  const options = [...root.querySelectorAll("[data-multiselect-option]")];
  if (!trigger || !menu || !label || options.length === 0) return;

  const placeholder = label.textContent.trim();
  let closeTimer;

  const isOpen = () => menu.dataset.state === "open";

  const finalizeClose = () => {
    if (isOpen()) return;
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    menu.hidden = true;
  };

  const close = () => {
    if (!isOpen()) return;
    menu.dataset.state = "closed";
    trigger.setAttribute("aria-expanded", "false");
    closeTimer = window.setTimeout(finalizeClose, 160);
  };

  const open = () => {
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    menu.hidden = false;
    void menu.offsetWidth;
    menu.dataset.state = "open";
    trigger.setAttribute("aria-expanded", "true");
    search?.focus();
  };

  const sync = () => {
    const checked = options
      .filter((option) => option.querySelector("input")?.checked)
      .map((option) => option.dataset.label ?? "");
    label.textContent = checked.length > 0 ? checked.join(", ") : placeholder;
    label.classList.toggle("text-muted-foreground", checked.length === 0);
  };

  const filter = () => {
    const query = (search?.value ?? "").trim().toLowerCase();
    let visible = 0;
    options.forEach((option) => {
      const match = (option.dataset.label ?? "").toLowerCase().includes(query);
      option.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  };

  trigger.addEventListener("click", () => {
    if (isOpen()) close();
    else open();
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      open();
    }
  });

  options.forEach((option) => {
    const input = option.querySelector("input");
    input?.addEventListener("change", sync);
  });

  search?.addEventListener("input", filter);

  clear?.addEventListener("click", () => {
    options.forEach((option) => {
      const input = option.querySelector("input");
      if (input) input.checked = false;
    });
    sync();
    filter();
    search?.focus();
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      close();
      trigger.focus();
    }
  });

  sync();
});
