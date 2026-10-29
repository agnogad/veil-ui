// RatingInput — dependency-free star rating with hover and keyboard support.
document.querySelectorAll("[data-rating]").forEach((root) => {
  const buttons = Array.from(root.querySelectorAll("[data-rating-star]"));
  const output = root.querySelector("[data-rating-value]");
  if (buttons.length === 0) return;

  let value = Number(root.dataset.value) || 0;
  let hover = null;

  function paint() {
    const active = hover === null ? value : hover;

    buttons.forEach((button, index) => {
      const filled = index < active;
      button.classList.toggle("text-amber-400", filled);
      button.classList.toggle("text-muted-foreground/50", !filled);
      button.setAttribute("aria-checked", String(value === index + 1));
      button.tabIndex = value === index + 1 || (value === 0 && index === 0) ? 0 : -1;

      const icon = button.querySelector("svg");
      if (icon) icon.classList.toggle("fill-current", filled);
    });

    if (output) output.textContent = `${value} / ${buttons.length}`;
  }

  function commit(next) {
    value = next;
    hover = null;
    paint();
  }

  buttons.forEach((button, index) => {
    const star = index + 1;

    button.addEventListener("click", () => commit(value === star ? 0 : star));

    button.addEventListener("mouseenter", () => {
      hover = star;
      paint();
    });

    button.addEventListener("focus", () => {
      hover = star;
      paint();
    });

    button.addEventListener("blur", () => {
      hover = null;
      paint();
    });

    button.addEventListener("keydown", (event) => {
      let next = null;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = Math.min(buttons.length, star + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = Math.max(1, star - 1);
      } else if (event.key === "Home") {
        next = 1;
      } else if (event.key === "End") {
        next = buttons.length;
      }

      if (next === null) return;
      event.preventDefault();
      commit(next);
      buttons[next - 1]?.focus();
    });
  });

  root.addEventListener("mouseleave", () => {
    hover = null;
    paint();
  });

  paint();
});
