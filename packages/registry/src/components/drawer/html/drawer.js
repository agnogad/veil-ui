// Drawer — native <dialog> sliding in from the right with Veil motion classes.
(function () {
  const dialog = document.querySelector("[data-drawer]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const enter = ["animate-in", "slide-in-from-right-full"];
  const exit = ["animate-out", "slide-out-to-right-full"];
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

  document.querySelector("[data-drawer-open]")?.addEventListener("click", open);
  dialog.querySelectorAll("[data-drawer-close]").forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
