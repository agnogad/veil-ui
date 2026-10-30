// Image Gallery — opens an accessible overlay viewer for the thumbnail grid.
document.querySelectorAll('[data-slot="image-gallery"]').forEach((root) => {
  const buttons = [...root.querySelectorAll("ul button")];
  if (!buttons.length) return;

  let index = 0;
  let dialog = null;
  let image = null;
  let caption = null;

  function render() {
    const button = buttons[index];
    const thumbnail = button?.querySelector("img");
    if (!image || !thumbnail) return;
    image.src = thumbnail.src;
    image.alt = thumbnail.alt;
    if (caption) caption.textContent = thumbnail.alt;
  }

  function open(target) {
    index = target;
    if (!dialog) {
      dialog = document.createElement("div");
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-label", "Image viewer");
      dialog.className =
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/95 p-6 backdrop-blur";
      dialog.innerHTML = `
        <button type="button" data-gallery-close aria-label="Close image viewer" class="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-md border bg-background text-sm">✕</button>
        <button type="button" data-gallery-prev aria-label="Previous image" class="absolute left-4 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md border bg-background text-sm">‹</button>
        <img class="max-h-[80vh] max-w-full rounded-lg object-contain" alt="" />
        <p class="max-w-md text-center text-sm text-muted-foreground"></p>
        <button type="button" data-gallery-next aria-label="Next image" class="absolute right-4 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md border bg-background text-sm">›</button>
      `;
      image = dialog.querySelector("img");
      caption = dialog.querySelector("p");
      dialog
        .querySelector("[data-gallery-close]")
        .addEventListener("click", close);
      dialog
        .querySelector("[data-gallery-prev]")
        .addEventListener("click", () => {
          index = (index - 1 + buttons.length) % buttons.length;
          render();
        });
      dialog
        .querySelector("[data-gallery-next]")
        .addEventListener("click", () => {
          index = (index + 1) % buttons.length;
          render();
        });
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) close();
      });
      document.body.append(dialog);
      document.addEventListener("keydown", onKeydown);
    }
    render();
    dialog.hidden = false;
    dialog.querySelector("[data-gallery-close]")?.focus();
  }

  function close() {
    if (dialog) dialog.hidden = true;
    document.removeEventListener("keydown", onKeydown);
  }

  function onKeydown(event) {
    if (event.key === "Escape") close();
  }

  buttons.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => open(buttonIndex));
  });
});
