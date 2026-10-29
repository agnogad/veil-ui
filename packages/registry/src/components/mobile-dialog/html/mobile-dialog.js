// Mobile Dialog — native <dialog> with Veil zoom/fade motion.
(function () {
  const dialog = document.querySelector("[data-mobile-dialog]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const enter = ["animate-in", "fade-in-0", "zoom-in-95"];
  const exit = ["animate-out", "fade-out-0", "zoom-out-95"];
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
    }, 200);
  };

  document
    .querySelector("[data-mobile-dialog-open]")
    ?.addEventListener("click", open);
  dialog.querySelectorAll("[data-mobile-dialog-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
