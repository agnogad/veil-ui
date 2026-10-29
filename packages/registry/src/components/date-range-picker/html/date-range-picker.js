// DateRangePicker — dependency-free two-month range calendar.
document.querySelectorAll("[data-date-range-picker]").forEach((root) => {
  const popover = root.querySelector("[data-range-popover]");
  const label = root.querySelector("[data-range-label]");
  const grids = [0, 1].map((index) =>
    root.querySelector(`[data-range-grid="${index}"]`),
  );
  const captions = [0, 1].map((index) =>
    root.querySelector(`[data-range-caption="${index}"]`),
  );
  const weekdaysEls = root.querySelectorAll("[data-range-weekdays]");
  const prev = root.querySelector("[data-range-prev]");
  const next = root.querySelector("[data-range-next]");
  if (!popover || !label || grids.some((grid) => !grid)) return;

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  weekdaysEls.forEach((element) => {
    element.innerHTML = weekdays
      .map(
        (day) =>
          `<span class="w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground">${day}</span>`,
      )
      .join("");
  });

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  let from = null;
  let to = null;

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function formatDay(date) {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function updateLabel() {
    if (!from) {
      label.textContent = "Pick a date range";
      label.classList.add("text-muted-foreground");
      return;
    }
    label.classList.remove("text-muted-foreground");
    label.textContent = to
      ? `${formatDay(from)} – ${formatDay(to)}`
      : formatDay(from);
  }

  function select(date) {
    const day = startOfDay(date);

    if (!from || to) {
      from = day;
      to = null;
    } else if (day < from) {
      to = from;
      from = day;
    } else {
      to = day;
    }

    updateLabel();
    render();

    if (from && to && popover.matches(":popover-open")) popover.hidePopover();
  }

  function renderMonth(base, grid, caption) {
    caption.textContent = base.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    const first = new Date(base.getFullYear(), base.getMonth(), 1);
    const gridStart = new Date(
      base.getFullYear(),
      base.getMonth(),
      1 - first.getDay(),
    );
    grid.innerHTML = "";

    const fromTime = from ? from.getTime() : null;
    const toTime = to ? to.getTime() : null;

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index,
      );
      const time = startOfDay(date).getTime();
      const outside = date.getMonth() !== base.getMonth();
      const isToday =
        time === startOfToday.getTime() && date.getMonth() === base.getMonth();
      const isStart = fromTime !== null && time === fromTime;
      const isEnd = toTime !== null && time === toTime;
      const inRange =
        fromTime !== null && toTime !== null && time > fromTime && time < toTime;

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(date.getDate());
      button.setAttribute("aria-label", formatDay(date));
      button.setAttribute("aria-selected", String(isStart || isEnd || inRange));
      button.disabled = time < startOfToday.getTime();
      button.className = [
        "inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        outside ? "text-muted-foreground/50" : "",
        isToday && !isStart && !isEnd ? "bg-accent text-accent-foreground" : "",
        inRange ? "rounded-none bg-accent text-accent-foreground" : "",
        isStart || isEnd
          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          : "",
      ]
        .filter(Boolean)
        .join(" ");

      button.addEventListener("click", () => select(date));
      grid.append(button);
    }
  }

  function render() {
    grids.forEach((grid, index) => {
      const base = new Date(
        view.getFullYear(),
        view.getMonth() + index,
        1,
      );
      renderMonth(base, grid, captions[index]);
    });
  }

  function moveMonth(offset) {
    view = new Date(view.getFullYear(), view.getMonth() + offset, 1);
    render();
  }

  prev?.addEventListener("click", () => moveMonth(-1));
  next?.addEventListener("click", () => moveMonth(1));

  popover.addEventListener("toggle", (event) => {
    if (event.newState !== "open") return;
    if (from) view = new Date(from.getFullYear(), from.getMonth(), 1);
    render();
  });

  updateLabel();
  render();
});
