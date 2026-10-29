// Copy Button — dependency-free clipboard write with a temporary copied state.
(() => {
  const button = document.querySelector("[data-copy-button]");
  if (!button) return;

  const status = document.querySelector("[data-copy-status]");
  const copyIcon = button.querySelector("[data-copy-icon]");
  const checkIcon = button.querySelector("[data-check-icon]");
  const label = button.dataset.copyLabel || "Copy";
  const copiedLabel = button.dataset.copiedLabel || "Copied";
  let timer;

  const setCopied = (copied) => {
    if (copied) button.setAttribute("data-copied", "");
    else button.removeAttribute("data-copied");

    button.setAttribute("aria-label", copied ? copiedLabel : label);
    copyIcon?.classList.toggle("hidden", copied);
    checkIcon?.classList.toggle("hidden", !copied);
    if (status) status.textContent = copied ? copiedLabel : "";
  };

  const writeClipboard = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy failed");
  };

  button.addEventListener("click", async () => {
    try {
      await writeClipboard(button.dataset.copyValue || "");
      setCopied(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  });
})();
