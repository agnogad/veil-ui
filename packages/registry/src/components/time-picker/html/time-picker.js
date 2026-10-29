// TimePicker — dependency-free sync between a native time input and presets.
document.querySelectorAll("[data-time-picker]").forEach((root) => {
  const popover = root.querySelector("[data-time-popover]");
  const input = root.querySelector("[data-time-input]");
  const label = root.querySelector("[data-time-label]");
  const done = root.querySelector("[data-time-done]");
  const presets = root.querySelectorAll("[data-time-preset]");
  if (!popover || !input || !label) return;

  let current = "09:30";

  function apply(value) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return false;
    current = value;
    input.value = value;
    label.textContent = value;
    label.classList.remove("text-muted-foreground");
    return true;
  }

  input.addEventListener("input", () => {
    if (input.value) apply(input.value);
  });

  presets.forEach((preset) => {
    preset.addEventListener("click", () => apply(preset.dataset.timePreset));
  });

  done?.addEventListener("click", () => {
    if (popover.matches(":popover-open")) popover.hidePopover();
  });

  popover.addEventListener("toggle", (event) => {
    if (event.newState === "open") input.value = current;
  });

  apply(current);
});
