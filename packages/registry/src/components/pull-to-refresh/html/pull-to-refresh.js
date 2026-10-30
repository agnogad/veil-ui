// Pull to Refresh — touch gesture plus a keyboard-accessible refresh button.
document.querySelectorAll('[data-slot="pull-to-refresh"]').forEach((root) => {
  const indicator = root.querySelector('[aria-live="polite"]');
  const scroller = root.querySelector(".overflow-y-auto");
  const trigger = root.querySelector("button");
  const list = root.querySelector("ul");
  if (!(scroller instanceof HTMLElement) || !list) return;

  let startY = null;
  let pull = 0;
  let refreshing = false;
  const threshold = 64;

  function render() {
    if (!indicator) return;
    indicator.style.height = `${refreshing ? 40 : pull}px`;
    indicator.textContent = refreshing
      ? "Refreshing…"
      : pull > 0
        ? pull >= threshold
          ? "Release to refresh"
          : "Pull to refresh"
        : "";
  }

  async function refresh() {
    if (refreshing) return;
    refreshing = true;
    pull = 0;
    render();
    await new Promise((resolve) => window.setTimeout(resolve, 600));

    const item = document.createElement("li");
    item.className = "px-4 py-3 text-sm";
    item.textContent = `Refreshed at ${new Date().toLocaleTimeString()}`;
    list.prepend(item);

    refreshing = false;
    render();
  }

  scroller.addEventListener(
    "touchstart",
    (event) => {
      if (scroller.scrollTop <= 0) startY = event.touches[0]?.clientY ?? null;
    },
    { passive: true },
  );

  scroller.addEventListener(
    "touchmove",
    (event) => {
      if (startY === null) return;
      const delta = (event.touches[0]?.clientY ?? 0) - startY;
      if (delta > 0) {
        pull = Math.min(delta * 0.5, 96);
        render();
      }
    },
    { passive: true },
  );

  scroller.addEventListener("touchend", () => {
    startY = null;
    if (pull >= threshold) refresh();
    else {
      pull = 0;
      render();
    }
  });

  trigger?.addEventListener("click", refresh);
  render();
});
