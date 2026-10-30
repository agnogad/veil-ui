// Code Editor — keeps the line-number gutter and line/character counts in sync.
document.querySelectorAll('[data-slot="code-editor"]').forEach((root) => {
  const area = root.querySelector("textarea");
  const gutter = root.querySelector('[aria-hidden="true"]');
  const count = root.querySelector(".tabular-nums");
  if (!(area instanceof HTMLTextAreaElement)) return;

  function render() {
    const lines = area.value.split("\n");
    if (count) {
      count.textContent = `${lines.length} line${lines.length === 1 ? "" : "s"} · ${area.value.length} chars`;
    }
    if (gutter) {
      gutter.replaceChildren(
        ...lines.map((_, index) => {
          const row = document.createElement("div");
          row.textContent = String(index + 1);
          return row;
        }),
      );
      gutter.scrollTop = area.scrollTop;
    }
  }

  area.addEventListener("input", render);
  area.addEventListener("scroll", () => {
    if (gutter) gutter.scrollTop = area.scrollTop;
  });
  area.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || area.readOnly || area.disabled) return;
    event.preventDefault();
    const start = area.selectionStart;
    const end = area.selectionEnd;
    area.value = `${area.value.slice(0, start)}  ${area.value.slice(end)}`;
    area.selectionStart = start + 2;
    area.selectionEnd = start + 2;
    render();
  });

  render();
});
