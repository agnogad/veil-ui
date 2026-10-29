// Toaster — dependency-free viewport with dismiss and re-triggered toasts.
(() => {
  const root = document.querySelector("[data-toaster-demo]");
  if (!root) return;

  const viewport = root.querySelector("[data-toaster]");
  const template = root.querySelector("#toaster-template");
  if (!viewport || !(template instanceof HTMLTemplateElement)) return;

  const dismiss = (toast) => {
    if (!toast.isConnected || toast.dataset.state === "closed") return;
    toast.dataset.state = "closed";
    window.setTimeout(() => toast.remove(), 180);
  };

  viewport.addEventListener("click", (event) => {
    const close = event.target.closest("[data-toast-close]");
    if (close) dismiss(close.closest('[data-slot="toast"]'));
  });

  root.querySelector("[data-toaster-trigger]")?.addEventListener("click", () => {
    const toast = template.content.firstElementChild.cloneNode(true);
    viewport.append(toast);
    window.setTimeout(() => dismiss(toast), 5000);
  });
})();
