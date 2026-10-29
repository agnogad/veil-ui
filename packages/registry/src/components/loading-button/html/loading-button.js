// Loading button — shows a spinner and disables itself while busy.
document.querySelectorAll("[data-loading-button]").forEach((button) => {
  const spinner = button.querySelector("[data-loading-spinner]");
  const label = button.querySelector("[data-loading-label]");

  button.addEventListener("click", () => {
    if (button.disabled) return;

    const idleLabel = label ? label.textContent : "";
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    if (spinner) spinner.hidden = false;
    if (label) label.textContent = "Saving...";

    window.setTimeout(() => {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      if (spinner) spinner.hidden = true;
      if (label) label.textContent = idleLabel;
    }, 1500);
  });
});
