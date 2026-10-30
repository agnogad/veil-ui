// Emoji Picker — filters the grid by name and announces an empty result.
document.querySelectorAll('[data-slot="emoji-picker"]').forEach((root) => {
  const input = root.querySelector("input");
  const list = root.querySelector("ul");
  if (!(input instanceof HTMLInputElement) || !list) return;

  const items = [...list.querySelectorAll("li")];
  const empty = document.createElement("p");
  empty.className = "py-6 text-center text-sm text-muted-foreground";
  empty.textContent = "No emoji found.";
  empty.hidden = true;
  list.after(empty);

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    let visible = 0;

    for (const item of items) {
      const button = item.querySelector("button");
      const name = (button?.getAttribute("aria-label") ?? "").toLowerCase();
      const match = !term || name.includes(term);
      item.hidden = !match;
      if (match) visible += 1;
    }

    empty.hidden = visible > 0;
  });
});
