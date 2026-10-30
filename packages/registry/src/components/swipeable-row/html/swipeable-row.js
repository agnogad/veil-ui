// Swipeable Row — reveals trailing actions on touch swipe and keyboard focus.
document.querySelectorAll('[data-slot="swipeable-row"]').forEach((root) => {
  const actions = root.querySelector(".absolute");
  const surface = root.querySelector(".relative");
  if (!(surface instanceof HTMLElement) || !actions) return;

  const total = [...actions.querySelectorAll("button")].reduce(
    (sum, button) => sum + (Number.parseFloat(button.style.width) || 72),
    0,
  );
  const openWidth = total || 72;

  let startX = null;
  let startY = null;
  let offset = 0;
  let current = 0;

  function apply(value) {
    current = value;
    surface.style.transform = `translateX(${value}px)`;
    surface.style.transition = "transform 200ms ease-out";
  }

  surface.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      offset = current;
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
      apply(Math.min(0, Math.max(-openWidth, offset + dx)));
    },
    { passive: true },
  );

  surface.addEventListener("touchend", () => {
    startX = null;
    startY = null;
    apply(current < -openWidth / 2 ? -openWidth : 0);
  });

  // Keyboard users can reach the actions through the buttons themselves.
  actions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("focus", () => apply(-openWidth));
  });

  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) apply(0);
  });

  document.addEventListener("pointerdown", (event) => {
    if (!root.contains(event.target)) apply(0);
  });
});
