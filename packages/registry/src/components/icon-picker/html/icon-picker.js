// Icon Picker — filters icons by name and keeps the pressed state in sync.
document.querySelectorAll('[data-slot="icon-picker"]').forEach((root) => {
  const input = root.querySelector('input[type="search"]');
  const grid = root.querySelector(".grid");
  if (!(input instanceof HTMLInputElement) || !grid) return;

  const buttons = [...grid.querySelectorAll("button")];
  const empty = document.createElement("p");
  empty.className = "col-span-full py-4 text-center text-xs text-muted-foreground";
  empty.textContent = "No icons found.";
  empty.hidden = true;
  grid.append(empty);

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    let visible = 0;
    for (const button of buttons) {
      const name = (button.getAttribute("aria-label") ?? "").toLowerCase();
      const match = !term || name.includes(term);
      button.hidden = !match;
      if (match) visible += 1;
    }
    empty.hidden = visible > 0;
  });

  for (const button of buttons) {
    button.addEventListener("click", () => {
      for (const item of buttons) item.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-pressed", "true");
    });
  }
});
