// Loading Overlay — non-modal popover overlay with Veil fade motion.
(function () {
  const overlay = document.querySelector("[data-loading-overlay]");
  const toggle = document.querySelector("[data-loading-toggle]");
  if (!(overlay instanceof HTMLElement) || !(toggle instanceof HTMLElement)) {
    return;
  }

  const enter = ["animate-in", "fade-in-0"];
  const exit = ["animate-out", "fade-out-0"];
  let closeTimer;

  const open = () => {
    window.clearTimeout(closeTimer);
    overlay.classList.remove(...exit);
    overlay.classList.add(...enter);
    if (!overlay.matches(":popover-open")) overlay.showPopover();
  };

  const close = () => {
    overlay.classList.remove(...enter);
    void overlay.offsetWidth;
    overlay.classList.add(...exit);
    closeTimer = window.setTimeout(() => {
      overlay.hidePopover();
      overlay.classList.remove(...exit);
    }, 150);
  };

  toggle.addEventListener("click", () => {
    if (overlay.matches(":popover-open")) close();
    else open();
  });

  overlay.addEventListener("toggle", (event) => {
    if (event.newState === "closed") overlay.classList.remove(...enter);
  });
})();
