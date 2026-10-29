// Mobile Drawer — native <dialog> sliding in from the left with Veil motion.
(function () {
  const dialog = document.querySelector("[data-mobile-drawer]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const enter = ["animate-in", "slide-in-from-left-full"];
  const exit = ["animate-out", "slide-out-to-left-full"];
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
    .querySelector("[data-mobile-drawer-open]")
    ?.addEventListener("click", open);
  dialog.querySelectorAll("[data-mobile-drawer-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
