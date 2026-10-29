// Range slider — keeps two native range inputs in sync.
document.querySelectorAll("[data-range-slider]").forEach((root) => {
  const minInput = root.querySelector("[data-range-min]");
  const maxInput = root.querySelector("[data-range-max]");
  const fill = root.querySelector("[data-range-fill]");
  const output = root.querySelector("[data-range-output]");
  if (!minInput || !maxInput || !fill || !output) return;

  const min = Number(minInput.min);
  const max = Number(minInput.max);
  const step = Number(minInput.step) || 1;

  const clamp = (value, low, high) =>
    Math.min(Math.max(value, low), high);

  const render = () => {
    let low = Number(minInput.value);
    let high = Number(maxInput.value);

    if (low > high) {
      if (document.activeElement === minInput) {
        high = low;
        maxInput.value = String(high);
      } else {
        low = high;
        minInput.value = String(low);
      }
    }

    const span = max - min || 1;
    const left = ((low - min) / span) * 100;
    const right = 100 - ((high - min) / span) * 100;
    fill.style.left = `${left}%`;
    fill.style.right = `${right}%`;
    output.textContent = `Selected $${low}–$${high}`;
  };

  const handleInput = (input, direction) => {
    const value = clamp(Number(input.value), min, max);
    input.value = String(value);

    if (direction === "min" && value > Number(maxInput.value)) {
      maxInput.value = String(value);
    }
    if (direction === "max" && value < Number(minInput.value)) {
      minInput.value = String(value);
    }

    render();
  };

  minInput.addEventListener("input", () => handleInput(minInput, "min"));
  maxInput.addEventListener("input", () => handleInput(maxInput, "max"));
  minInput.addEventListener("change", render);
  maxInput.addEventListener("change", render);

  // Snap both inputs to the configured step before first paint.
  minInput.value = String(clamp(Number(minInput.value), min, max));
  maxInput.value = String(clamp(Number(maxInput.value), min, max));
  minInput.step = String(step);
  maxInput.step = String(step);
  render();
});
