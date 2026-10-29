// Password input — toggles between password and text.
document.querySelectorAll("[data-password-input]").forEach((root) => {
  const input = root.querySelector("input");
  const button = root.querySelector("[data-password-toggle]");
  const showIcon = root.querySelector("[data-icon-show]");
  const hideIcon = root.querySelector("[data-icon-hide]");
  if (!input || !button) return;

  button.addEventListener("click", () => {
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.setAttribute("aria-pressed", String(!visible));
    button.setAttribute("aria-label", visible ? "Show password" : "Hide password");
    if (showIcon) showIcon.classList.toggle("hidden", !visible);
    if (hideIcon) hideIcon.classList.toggle("hidden", visible);
  });
});
