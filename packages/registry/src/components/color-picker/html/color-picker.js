// ColorPicker — dependency-free sync between native picker, hex field and swatches.
document.querySelectorAll("[data-color-picker]").forEach((root) => {
  const native = root.querySelector("[data-color-native]");
  const hex = root.querySelector("[data-color-hex]");
  const triggerValue = root.querySelector("[data-color-trigger-value]");
  const triggerSwatch = root.querySelector("[data-color-trigger-swatch]");
  const swatches = Array.from(root.querySelectorAll("[data-color-swatch]"));
  if (!native || !hex || !triggerValue || !triggerSwatch) return;

  function normalize(input) {
    const raw = String(input).trim().replace(/^#/, "").toLowerCase();
    if (/^[0-9a-f]{3}$/.test(raw)) {
      return `#${raw
        .split("")
        .map((char) => char + char)
        .join("")}`;
    }
    if (/^[0-9a-f]{6}$/.test(raw)) return `#${raw}`;
    return null;
  }

  function apply(value) {
    const normalized = normalize(value);
    if (!normalized) return false;

    const upper = normalized.toUpperCase();
    const light = normalized === "#ffffff" || normalized === "#fef08a";

    native.value = normalized;
    hex.value = upper;
    triggerValue.textContent = upper;
    triggerSwatch.style.backgroundColor = normalized;

    swatches.forEach((swatch) => {
      const selected =
        String(swatch.dataset.colorSwatch).toLowerCase() === normalized;
      swatch.setAttribute("aria-pressed", String(selected));

      const check = swatch.querySelector("[data-color-check]");
      if (check) {
        check.classList.toggle("hidden", !selected);
        check.classList.toggle("text-white", selected && !light);
        check.classList.toggle("text-black", selected && light);
      }
    });

    return true;
  }

  native.addEventListener("input", () => apply(native.value));

  hex.addEventListener("change", () => apply(hex.value));

  hex.addEventListener("blur", () => {
    if (!apply(hex.value)) hex.value = triggerValue.textContent;
  });

  hex.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (!apply(hex.value)) hex.value = triggerValue.textContent;
    hex.blur();
  });

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => apply(swatch.dataset.colorSwatch));
  });

  apply(triggerValue.textContent);
});
