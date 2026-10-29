// Hamburger menu — toggles the animated open/closed state.
document.querySelectorAll("[data-hamburger-menu]").forEach((button) => {
  button.addEventListener("click", () => {
    const open = button.dataset.state !== "open";
    button.dataset.state = open ? "open" : "closed";
    button.setAttribute("aria-expanded", String(open));
  });
});
