// Number input — stepper buttons, clamping and min/max disabled states.
document.querySelectorAll("[data-number-input]").forEach((root) => {
  const field = root.querySelector("[data-number-field]");
  const output = root.parentElement?.querySelector("[data-number-output]");
  const buttons = [...root.querySelectorAll("[data-number-step]")];
  if (!field) return;

  const min = field.min === "" ? undefined : Number(field.min);
  const max = field.max === "" ? undefined : Number(field.max);
  const step = Number(field.step) || 1;

  const clamp = (value) => {
    let next = value;
    if (min !== undefined) next = Math.max(next, min);
    if (max !== undefined) next = Math.min(next, max);
    return Number(next.toFixed(10));
  };

  const sync = () => {
    const value = Number(field.value);
    if (Number.isFinite(value)) {
      field.setAttribute("aria-valuenow", String(value));
    }
    buttons.forEach((button) => {
      const direction = Number(button.dataset.numberStep);
      button.disabled =
        (direction < 0 && min !== undefined && value <= min) ||
        (direction > 0 && max !== undefined && value >= max);
    });
    if (output) output.textContent = field.value || "0";
  };

  const commit = (value) => {
    field.value = String(clamp(value));
    sync();
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.numberStep);
      commit((Number(field.value) || 0) + direction * step);
    });
  });

  field.addEventListener("input", () => {
    const value = Number(field.value);
    if (field.value.trim() !== "" && Number.isFinite(value)) {
      if (min !== undefined && value < min) return;
      if (max !== undefined && value > max) return;
      sync();
    }
  });

  field.addEventListener("change", () => {
    const value = Number(field.value);
    commit(Number.isFinite(value) ? value : (min ?? 0));
  });

  field.addEventListener("blur", () => {
    if (field.value.trim() === "") commit(min ?? 0);
  });

  if (min !== undefined) field.setAttribute("aria-valuemin", String(min));
  if (max !== undefined) field.setAttribute("aria-valuemax", String(max));
  sync();
});
