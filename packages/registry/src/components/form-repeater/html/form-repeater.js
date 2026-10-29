// Form Repeater — dependency-free add/remove handling for [data-form-repeater] blocks.
document.querySelectorAll("[data-form-repeater]").forEach((root) => {
  const rows = root.querySelector("[data-repeater-rows]");
  const addButton = root.querySelector("[data-repeater-add]");
  if (!rows || !addButton) return;

  const min = Number(root.dataset.min ?? 1);
  const max = root.dataset.max ? Number(root.dataset.max) : Number.POSITIVE_INFINITY;

  const sync = () => {
    const items = [...rows.querySelectorAll("[data-repeater-row]")];
    items.forEach((row, index) => {
      const label = row.querySelector("[data-row-label]");
      if (label) label.textContent = `Row ${index + 1}`;
      row.querySelectorAll("label").forEach((fieldLabel) => {
        const field = fieldLabel.querySelector("span")?.textContent?.trim();
        const input = fieldLabel.querySelector("input");
        if (field && input) input.setAttribute("aria-label", `${field} row ${index + 1}`);
      });
      const remove = row.querySelector("[data-remove-row]");
      if (remove) remove.setAttribute("aria-label", `Remove row ${index + 1}`);
    });
    rows.querySelectorAll("[data-remove-row]").forEach((button) => {
      button.disabled = items.length <= min;
    });
    addButton.disabled = items.length >= max;
  };

  addButton.addEventListener("click", () => {
    const items = rows.querySelectorAll("[data-repeater-row]");
    if (items.length >= max) return;
    const clone = items[0]?.cloneNode(true);
    if (!clone) return;
    clone.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    rows.append(clone);
    sync();
  });

  rows.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-row]");
    if (!button) return;
    const items = rows.querySelectorAll("[data-repeater-row]");
    if (items.length <= min) return;
    button.closest("[data-repeater-row]")?.remove();
    sync();
  });

  sync();
});
