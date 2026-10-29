// Mobile Filter Sheet — toggleable chips in a native bottom-sheet <dialog>.
(function () {
  const dialog = document.querySelector("[data-filter-sheet]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const options = [...dialog.querySelectorAll("[data-filter-option]")];
  const enter = ["animate-in", "slide-in-from-bottom-full"];
  const exit = ["animate-out", "slide-out-to-bottom-full"];
  let closeTimer;

  const open = () => {
    window.clearTimeout(closeTimer);
    dialog.classList.remove(...exit);
    dialog.classList.add(...enter);
    if (!dialog.open) dialog.showModal();
  };

  const close = () => {
    dialog.classList.remove(...enter);
    void dialog.offsetWidth;
    dialog.classList.add(...exit);
    closeTimer = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove(...exit);
    }, 300);
  };

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const active = option.getAttribute("aria-pressed") === "true";
      option.setAttribute("aria-pressed", String(!active));
    });
  });

  dialog.querySelector("[data-filter-reset]")?.addEventListener("click", () => {
    options.forEach((option) => option.setAttribute("aria-pressed", "false"));
  });

  document
    .querySelector("[data-filter-sheet-open]")
    ?.addEventListener("click", open);
  dialog.querySelectorAll("[data-filter-sheet-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
