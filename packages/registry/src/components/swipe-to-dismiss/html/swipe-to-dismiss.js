// Swipe to Dismiss — drag the card away or use the dismiss button.
document.querySelectorAll('[data-slot="swipe-to-dismiss"]').forEach((root) => {
  const surface = root.querySelector(".transition-transform");
  const trigger = root.querySelector('button[aria-label="Dismiss"]');
  if (!(surface instanceof HTMLElement)) return;

  let startX = null;
  let startY = null;
  let offset = 0;
  let dismissed = false;

  function reset() {
    offset = 0;
    surface.style.transform = "translateX(0px)";
    surface.style.opacity = "1";
    root.style.opacity = "1";
  }

  function dismiss(direction = 1) {
    if (dismissed) return;
    dismissed = true;
    surface.style.transform = `translateX(${direction * 120}%)`;
    root.style.opacity = "0";
    window.setTimeout(() => root.remove(), 200);
  }

  surface.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      offset = 0;
      surface.style.transition = "none";
    },
    { passive: true },
  );

  surface.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      if (!touch || startX === null || startY === null) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) return;
      offset = dx;
      surface.style.transform = `translateX(${dx}px)`;
      root.style.opacity = String(Math.max(0.2, 1 - Math.abs(dx) / 320));
    },
    { passive: true },
  );

  surface.addEventListener("touchend", () => {
    surface.style.transition = "";
    if (Math.abs(offset) > 96) {
      dismiss(offset < 0 ? -1 : 1);
      return;
    }
    reset();
    startX = null;
    startY = null;
  });

  trigger?.addEventListener("click", () => dismiss(1));
});
