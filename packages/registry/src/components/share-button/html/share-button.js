// Share button — native share sheet with a clipboard fallback.
document.querySelectorAll("[data-share-button]").forEach((button) => {
  const label = button.querySelector("[data-share-label]");
  const shareIcon = button.querySelector("[data-share-icon]");
  const copiedIcon = button.querySelector("[data-copied-icon]");

  button.addEventListener("click", async () => {
    const url = button.dataset.shareUrl || window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }

    if (label) label.textContent = "Link copied";
    if (shareIcon) shareIcon.hidden = true;
    if (copiedIcon) copiedIcon.hidden = false;
  });
});
