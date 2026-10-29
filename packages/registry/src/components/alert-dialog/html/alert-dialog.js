// Alert dialog — dependency-free behavior for [data-dialog-open] triggers.
document.querySelectorAll("[data-dialog-open]").forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.dialogOpen);
  if (!dialog) return;

  trigger.addEventListener("click", () => dialog.showModal());

  // Clicking the backdrop closes the dialog. Clicks inside the form bubble to
  // the dialog itself, so compare the exact target.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (dialog.returnValue === "confirm") {
      trigger.dispatchEvent(
        new CustomEvent("dialog:confirm", { bubbles: true, detail: { dialog } }),
      );
    }
  });
});
