// Modal — native <dialog> with showModal()/close() and Veil motion classes.
(function () {
  const dialog = document.querySelector("[data-modal]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const enter = ["animate-in", "fade-in-0", "zoom-in-95"];
  const exit = ["animate-out", "fade-out-0", "zoom-out-95"];
  let closeTimer;

  const open = () => {
    window.clearTimeout(closeTimer);
    dialog.classList.remove(...exit);
    dialog.classList.add(...enter);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector("input")?.focus();
  };

  const close = () => {
    dialog.classList.remove(...enter);
    void dialog.offsetWidth;
    dialog.classList.add(...exit);
    closeTimer = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove(...exit);
    }, 150);
  };

  document.querySelector("[data-modal-open]")?.addEventListener("click", open);
  dialog.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
})();
