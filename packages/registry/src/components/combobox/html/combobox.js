// Combobox — search filtering, selection and keyboard navigation.
document.querySelectorAll("[data-combobox]").forEach((root) => {
  const trigger = root.querySelector("[data-combobox-trigger]");
  const content = root.querySelector("[data-combobox-content]");
  const label = root.querySelector("[data-combobox-label]");
  const search = root.querySelector("[data-combobox-search]");
  const empty = root.querySelector("[data-combobox-empty]");
  const valueInput = root.querySelector("[data-combobox-value]");
  const options = [...root.querySelectorAll("[data-combobox-option]")];
  if (!trigger || !content || !label || !search || options.length === 0) return;

  const placeholder = label.textContent.trim();
  let closeTimer;

  const isOpen = () => content.dataset.state === "open";
  const visibleOptions = () => options.filter((option) => !option.hidden);

  const finalizeClose = () => {
    if (isOpen()) return;
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    content.hidden = true;
  };

  const close = (restoreFocus = false) => {
    if (!isOpen()) return;
    content.dataset.state = "closed";
    trigger.setAttribute("aria-expanded", "false");
    search.setAttribute("aria-expanded", "false");
    closeTimer = window.setTimeout(finalizeClose, 160);
    if (restoreFocus) trigger.focus();
  };

  const open = () => {
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    content.hidden = false;
    search.value = "";
    filter();
    void content.offsetWidth;
    content.dataset.state = "open";
    trigger.setAttribute("aria-expanded", "true");
    search.setAttribute("aria-expanded", "true");
    search.focus();
  };

  const filter = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    options.forEach((option) => {
      const match = (option.dataset.label ?? "").toLowerCase().includes(query);
      option.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  };

  const select = (option) => {
    label.textContent = option.dataset.label ?? "";
    label.classList.remove("text-muted-foreground");
    if (valueInput) valueInput.value = option.dataset.value ?? "";
    options.forEach((item) => {
      const check = item.querySelector("[data-check]");
      check?.classList.toggle("opacity-0", item !== option);
    });
    close(true);
  };

  trigger.addEventListener("click", () => {
    if (isOpen()) close(true);
    else open();
  });

  search.addEventListener("input", filter);

  search.addEventListener("keydown", (event) => {
    const visible = visibleOptions();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      visible[0]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      visible[visible.length - 1]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    }
  });

  options.forEach((option, index) => {
    option.addEventListener("click", () => select(option));
    option.addEventListener("keydown", (event) => {
      const visible = visibleOptions();
      const position = visible.indexOf(option);
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select(option);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        visible[Math.min(position + 1, visible.length - 1)]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (position === 0) search.focus();
        else visible[Math.max(position - 1, 0)]?.focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
      // Keep index referenced for stable ordering in older browsers.
      void index;
    });
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) close();
  });

  if (placeholder) label.dataset.placeholder = placeholder;
});
