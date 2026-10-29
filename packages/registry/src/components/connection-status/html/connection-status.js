// Connection Status — dependency-free navigator.onLine indicator.
(() => {
  const element = document.querySelector("[data-connection-auto]");
  if (!element) return;

  const label = element.querySelector("[data-connection-label]");
  const dot = element.querySelector("[data-connection-dot]");
  const ping = element.querySelector("[data-connection-ping]");

  const statuses = {
    online: {
      label: "Connected",
      dot: "bg-emerald-500",
      text: "text-emerald-700 dark:text-emerald-400",
    },
    offline: {
      label: "Disconnected",
      dot: "bg-red-500",
      text: "text-red-700 dark:text-red-400",
    },
    connecting: {
      label: "Connecting",
      dot: "bg-amber-500",
      text: "text-amber-700 dark:text-amber-400",
    },
  };
  const dots = [...new Set(Object.values(statuses).map((item) => item.dot))];
  const texts = [...new Set(Object.values(statuses).map((item) => item.text))];

  let timer;

  const render = (statusName) => {
    const status = statuses[statusName] ?? statuses.online;
    element.dataset.status = statusName;

    if (label) label.textContent = status.label;
    if (dot) {
      dot.classList.remove(...dots);
      dot.classList.add(status.dot);
    }
    if (ping) {
      ping.classList.remove(...dots);
      ping.classList.add(status.dot);
      ping.classList.toggle("hidden", statusName !== "connecting");
    }

    element.classList.remove(...texts);
    element.classList.add(status.text);
  };

  const check = () => {
    render(navigator.onLine === false ? "offline" : "online");
  };

  window.addEventListener("offline", () => {
    window.clearTimeout(timer);
    render("offline");
  });

  window.addEventListener("online", () => {
    window.clearTimeout(timer);
    render("connecting");
    timer = window.setTimeout(() => render("online"), 600);
  });

  check();
})();
