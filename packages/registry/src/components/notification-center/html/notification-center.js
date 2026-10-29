// Notification Center — dependency-free unread count, dismiss and mark-all-read.
document.querySelectorAll("[data-notification-center]").forEach((center) => {
  const panel = center.querySelector("[data-notification-center-panel]");
  const trigger = center.querySelector("[data-notification-trigger]");
  const badge = center.querySelector("[data-notification-badge]");
  const markAll = center.querySelector("[data-notification-mark-all]");
  const empty = center.querySelector("[data-notification-empty]");
  const list = panel?.querySelector(".grid");
  if (!panel || !trigger) return;

  const sync = () => {
    const items = [...panel.querySelectorAll("[data-notification-item]")];
    const unread = items.filter((item) => item.hasAttribute("data-unread"));
    const count = unread.length;

    if (badge) {
      badge.textContent = String(count);
      badge.hidden = count === 0;
    }
    if (markAll) markAll.hidden = count === 0;
    if (empty) empty.hidden = items.length > 0;
    if (list) list.hidden = items.length === 0;

    trigger.setAttribute(
      "aria-label",
      count > 0 ? `Notifications (${count} unread)` : "Notifications",
    );
  };

  panel.querySelectorAll("[data-notification-center-dismiss]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("[data-notification-item]")?.remove();
      sync();
    });
  });

  markAll?.addEventListener("click", () => {
    panel.querySelectorAll("[data-notification-item][data-unread]").forEach((item) => {
      item.removeAttribute("data-unread");
      item.classList.remove("border-primary/30", "bg-primary/5");
      item.classList.add("border", "bg-card");
      item.querySelector("[data-notification-center-dot]")?.remove();
      item.querySelector(".sr-only")?.remove();
    });
    sync();
  });

  sync();
});
