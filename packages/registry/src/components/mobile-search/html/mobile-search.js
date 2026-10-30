// Mobile Search — submits the field, reuses suggestions and shows the query.
document.querySelectorAll('[data-slot="mobile-search"]').forEach((root) => {
  const form = root.querySelector('form[role="search"]');
  const input = root.querySelector('input[type="search"]');
  const status = root.parentElement?.querySelector("p.text-sm");
  const suggestions = [...root.querySelectorAll("ul button")];
  if (!(form instanceof HTMLFormElement) || !(input instanceof HTMLInputElement)) {
    return;
  }

  function announce(value) {
    if (status) {
      status.textContent = value
        ? `Searching for “${value}”`
        : "Try a suggestion";
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    announce(input.value.trim());
  });

  suggestions.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.textContent?.trim() ?? "";
      announce(input.value);
    });
  });

  input.addEventListener("input", () => {
    if (!input.value) announce("");
  });
});
