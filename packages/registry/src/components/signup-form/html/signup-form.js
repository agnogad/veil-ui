// Signup Form — dependency-free password visibility toggle for [data-password-toggle] buttons.
document.querySelectorAll("[data-password-toggle]").forEach((button) => {
  const input = document.getElementById(button.dataset.passwordToggle);
  if (!input) return;

  const showIcon = button.querySelector("[data-icon-show]");
  const hideIcon = button.querySelector("[data-icon-hide]");

  button.addEventListener("click", () => {
    const reveal = input.type === "password";
    input.type = reveal ? "text" : "password";
    button.setAttribute("aria-pressed", String(reveal));
    button.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
    showIcon?.classList.toggle("hidden", reveal);
    hideIcon?.classList.toggle("hidden", !reveal);
  });
});
