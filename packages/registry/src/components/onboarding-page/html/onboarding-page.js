// Onboarding Page — dependency-free step navigation for [data-onboarding] blocks.
document.querySelectorAll("[data-onboarding]").forEach((root) => {
  const total = Number(root.dataset.total ?? 4);
  let step = Number(root.dataset.step ?? 1);

  const label = root.querySelector("[data-onboarding-label]");
  const progress = root.querySelector("[data-onboarding-progress]");
  const track = root.querySelector("[data-onboarding-progress-track]");
  const back = root.querySelector("[data-onboarding-back]");
  const next = root.querySelector("[data-onboarding-next]");
  const indicators = [...root.querySelectorAll("[data-onboarding-indicator]")];
  const titles = [...root.querySelectorAll("[data-onboarding-step-title]")];

  const render = () => {
    root.dataset.step = String(step);
    if (label) label.textContent = `Step ${step} of ${total}`;
    if (progress) progress.style.width = `${(step / total) * 100}%`;
    if (track) track.setAttribute("aria-valuenow", String(Math.round((step / total) * 100)));
    if (back) back.disabled = step <= 1;
    if (next) next.disabled = step >= total;

    indicators.forEach((indicator, index) => {
      const number = index + 1;
      const state =
        number < step ? "completed" : number === step ? "current" : "upcoming";
      indicator.dataset.state = state;
      indicator.textContent = state === "completed" ? "✓" : String(number);
      const item = indicator.closest("li");
      if (state === "current") {
        item?.setAttribute("aria-current", "step");
      } else {
        item?.removeAttribute("aria-current");
      }
    });

    titles.forEach((title, index) => {
      const number = index + 1;
      title.dataset.state =
        number < step ? "completed" : number === step ? "current" : "upcoming";
      title.classList.toggle("text-muted-foreground", number > step);
    });
  };

  back?.addEventListener("click", () => {
    if (step > 1) {
      step -= 1;
      render();
    }
  });

  next?.addEventListener("click", () => {
    if (step < total) {
      step += 1;
      render();
    }
  });

  render();
});
