// DatePicker — dependency-free month grid inside a native popover.
document.querySelectorAll("[data-date-picker]").forEach((root) => {
  const popover = root.querySelector("[data-date-popover]");
  const label = root.querySelector("[data-date-label]");
  const grid = root.querySelector("[data-calendar-grid]");
  const caption = root.querySelector("[data-calendar-caption]");
  const weekdaysEl = root.querySelector("[data-calendar-weekdays]");
  const prev = root.querySelector("[data-calendar-prev]");
  const next = root.querySelector("[data-calendar-next]");
  if (!popover || !label || !grid || !caption || !weekdaysEl) return;

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  weekdaysEl.innerHTML = weekdays
    .map(
      (day) =>
        `<span class="w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground">${day}</span>`,
    )
    .join("");

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = null;

  function isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function formatDate(date) {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function render() {
    caption.textContent = view.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const gridStart = new Date(
      view.getFullYear(),
      view.getMonth(),
      1 - first.getDay(),
    );
    grid.innerHTML = "";

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index,
      );
      const outside = date.getMonth() !== view.getMonth();
      const isToday = isSameDay(date, today);
      const isSelected = selected ? isSameDay(date, selected) : false;
      const isDisabled = date < startOfToday;

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(date.getDate());
      button.setAttribute("aria-label", formatDate(date));
      button.setAttribute("aria-selected", String(isSelected));
      button.disabled = isDisabled;
      button.className = [
        "inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        outside ? "text-muted-foreground/50" : "",
        isToday && !isSelected ? "bg-accent text-accent-foreground" : "",
        isSelected
          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          : "",
      ]
        .filter(Boolean)
        .join(" ");

      button.addEventListener("click", () => {
        selected = date;
        label.textContent = formatDate(date);
        label.classList.remove("text-muted-foreground");
        if (popover.matches(":popover-open")) popover.hidePopover();
      });

      grid.append(button);
    }
  }

  function moveMonth(offset) {
    view = new Date(view.getFullYear(), view.getMonth() + offset, 1);
    render();
  }

  prev?.addEventListener("click", () => moveMonth(-1));
  next?.addEventListener("click", () => moveMonth(1));

  popover.addEventListener("toggle", (event) => {
    if (event.newState !== "open") return;
    if (selected) {
      view = new Date(selected.getFullYear(), selected.getMonth(), 1);
    }
    render();
  });

  render();
});
