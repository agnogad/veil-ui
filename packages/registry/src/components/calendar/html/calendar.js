// Calendar — renders a month grid with single-date selection.
document.querySelectorAll('[data-slot="calendar"]').forEach((root) => {
  const label = root.querySelector("[data-calendar-label]");
  const heading = root.querySelector('[role="grid"]');
  const body = root.querySelector("tbody");
  const status = root.parentElement?.querySelector("[data-calendar-status]");
  if (!(body instanceof HTMLElement)) return;

  const today = new Date();
  const view = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const dayClasses = [
    "inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "hover:bg-accent hover:text-accent-foreground",
  ];

  function sameDay(left, right) {
    return (
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate()
    );
  }

  function render() {
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - first.getDay());
    const title = new Intl.DateTimeFormat(undefined, {
      month: "long",
      year: "numeric",
    }).format(view);

    if (label) label.textContent = title;
    heading?.setAttribute("aria-label", title);
    if (status) {
      status.textContent = selected
        ? new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(selected)
        : "No date selected";
    }

    const rows = [];
    let week;

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + index,
      );

      if (index % 7 === 0) {
        week = document.createElement("tr");
        week.className = "flex w-full";
        rows.push(week);
      }

      const cell = document.createElement("td");
      cell.className = "relative size-9 p-0 text-center text-sm";

      const button = document.createElement("button");
      button.type = "button";
      button.dataset.slot = "calendar-day";
      button.textContent = String(date.getDate());
      button.setAttribute(
        "aria-label",
        new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(date),
      );

      const isSelected = selected && sameDay(date, selected);
      const isToday = sameDay(date, today);
      const outside = date.getMonth() !== month;

      button.className = [
        ...dayClasses,
        outside ? "text-muted-foreground/50" : "",
        isToday && !isSelected ? "bg-accent text-accent-foreground" : "",
        isSelected ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "",
      ]
        .filter(Boolean)
        .join(" ");

      if (isSelected) {
        button.setAttribute("aria-selected", "true");
        cell.setAttribute("aria-selected", "true");
      }
      if (isToday) button.setAttribute("aria-current", "date");

      button.addEventListener("click", () => {
        selected = date;
        render();
      });

      cell.append(button);
      week.append(cell);
    }

    body.replaceChildren(...rows);
  }

  root
    .querySelector("[data-calendar-prev]")
    ?.addEventListener("click", () => {
      view.setMonth(view.getMonth() - 1);
      render();
    });

  root
    .querySelector("[data-calendar-next]")
    ?.addEventListener("click", () => {
      view.setMonth(view.getMonth() + 1);
      render();
    });

  render();
});
