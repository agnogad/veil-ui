// Notification — dependency-free dismiss behavior for [data-notification-dismiss].
document.querySelectorAll("[data-notification-dismiss]").forEach((button) => {
  button.addEventListener("click", () => {
    const notification = button.closest('[data-slot="notification"]');
    if (notification) notification.remove();
  });
});
