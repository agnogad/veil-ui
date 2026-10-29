// Mobile Share Sheet — native bottom-sheet <dialog> with copy-link feedback.
(function () {
  const dialog = document.querySelector("[data-share-sheet]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const url = "https://veil-ui.dev/docs/theming";
  const copyButton = dialog.querySelector("[data-share-copy]");
  const copyLabel = dialog.querySelector("[data-share-copy-label]");
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

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard?.writeText(url);
      if (copyLabel) copyLabel.textContent = "Copied";
    } catch {
      if (copyLabel) copyLabel.textContent = "Copy link";
    }
  });

  document
    .querySelector("[data-share-sheet-open]")
    ?.addEventListener("click", open);
  dialog.querySelectorAll("[data-share-sheet-close]").forEach((target) => {
    target.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
