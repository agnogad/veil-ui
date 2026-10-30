// Mobile Picker — opens a bottom sheet, updates the choice and restores focus.
document.querySelectorAll("[data-picker-trigger]").forEach((trigger) => {
  const wrapper = trigger.closest("div");
  const field = wrapper?.querySelector("div");
  const sheet = document.querySelector("[data-picker-sheet]");
  const options = [...(sheet?.querySelectorAll("[data-picker-option]") ?? [])];
  if (!(sheet instanceof HTMLElement) || !field) return;

  const value = field.querySelector("[data-picker-value]");
  let checked = options.find((option) => option.getAttribute("aria-checked") === "true");

  function close() {
    sheet.hidden = true;
    trigger.focus();
  }

  function select(option) {
    for (const item of options) {
      const active = item === option;
      item.setAttribute("aria-checked", String(active));
      item.classList.toggle("bg-accent/60", active);
      item.classList.toggle("font-medium", active);
      item.querySelector("svg")?.classList.toggle("hidden", !active);
    }
    checked = option;
    if (value) value.textContent = option.getAttribute("data-label") ?? "";
    close();
  }

  trigger.addEventListener("click", () => {
    sheet.hidden = false;
    (checked ?? options[0])?.focus();
  });

  options.forEach((option) => {
    option.addEventListener("click", () => select(option));
  });

  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) close();
  });

  sheet.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  });
});
