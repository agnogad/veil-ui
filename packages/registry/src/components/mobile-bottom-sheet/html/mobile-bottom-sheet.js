// Mobile Bottom Sheet — native <dialog> with Veil slide motion.
(function () {
  const dialog = document.querySelector("[data-mobile-bottom-sheet]");
  if (!(dialog instanceof HTMLDialogElement)) return;

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

  document
    .querySelector("[data-mobile-bottom-sheet-open]")
    ?.addEventListener("click", open);
  dialog.querySelectorAll("[data-mobile-bottom-sheet-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
