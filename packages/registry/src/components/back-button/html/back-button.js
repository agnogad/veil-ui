// Back button — returns to the previous history entry.
document.querySelectorAll("[data-back-button]").forEach((button) => {
  button.addEventListener("click", () => {
    window.history.back();
  });
});
