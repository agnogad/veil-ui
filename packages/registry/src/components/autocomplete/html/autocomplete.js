// Autocomplete — type-ahead filtering with arrow keys and Enter.
document.querySelectorAll("[data-autocomplete]").forEach((root) => {
  const input = root.querySelector("[data-autocomplete-input]");
  const list = root.querySelector("[data-autocomplete-list]");
  const empty = root.querySelector("[data-autocomplete-empty]");
  const options = [...root.querySelectorAll("[data-autocomplete-option]")];
  if (!input || !list || options.length === 0) return;

  let activeIndex = -1;

  const visibleOptions = () => options.filter((option) => !option.hidden);

  const open = () => {
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    activeIndex = -1;
  };

  const filter = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    options.forEach((option) => {
      const match = (option.dataset.label ?? "").toLowerCase().includes(query);
      option.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  };

  const setActive = (index) => {
    const visible = visibleOptions();
    visible.forEach((option) => {
      option.classList.remove("bg-accent", "text-accent-foreground");
      option.setAttribute("aria-selected", "false");
    });

    if (visible.length === 0) {
      activeIndex = -1;
      input.removeAttribute("aria-activedescendant");
      return;
    }

    activeIndex = Math.min(Math.max(index, 0), visible.length - 1);
    const option = visible[activeIndex];
    option.classList.add("bg-accent", "text-accent-foreground");
    option.setAttribute("aria-selected", "true");
    input.setAttribute("aria-activedescendant", option.id);
    option.scrollIntoView({ block: "nearest" });
  };

  const select = (option) => {
    input.value = option.dataset.label ?? option.textContent.trim();
    close();
    input.focus();
  };

  input.addEventListener("focus", () => {
    filter();
    open();
  });

  input.addEventListener("input", () => {
    activeIndex = -1;
    filter();
    open();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      open();
      setActive(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      open();
      setActive(activeIndex - 1);
    } else if (event.key === "Enter") {
      const option = visibleOptions()[activeIndex];
      if (!list.hidden && option) {
        event.preventDefault();
        select(option);
      }
    } else if (event.key === "Escape") {
      close();
    } else if (event.key === "Home" && !list.hidden) {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End" && !list.hidden) {
      event.preventDefault();
      setActive(visibleOptions().length - 1);
    }
  });

  options.forEach((option) => {
    option.addEventListener("mousedown", (event) => {
      event.preventDefault();
      select(option);
    });
    option.addEventListener("mouseenter", () => {
      setActive(visibleOptions().indexOf(option));
    });
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) close();
  });
});
