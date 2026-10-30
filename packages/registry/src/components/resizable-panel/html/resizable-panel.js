// Resizable Panel — pointer dragging between two panels inside a group.
document.querySelectorAll('[data-slot="resizable-panel-group"]').forEach((group) => {
  const panels = [...group.querySelectorAll('[data-slot="resizable-panel"]')];
  const handles = [...group.querySelectorAll('[data-slot="resizable-handle"]')];
  const vertical = group.getAttribute("data-orientation") === "vertical";

  handles.forEach((handle, index) => {
    const before = panels[index];
    const after = panels[index + 1];
    if (!before || !after) return;

    function start(event) {
      event.preventDefault();
      const size = vertical ? group.clientHeight : group.clientWidth;
      const startPos = vertical ? event.clientY : event.clientX;
      const first = Number(before.dataset.defaultSize || before.style.flexGrow || 50);
      const second = Number(after.dataset.defaultSize || after.style.flexGrow || 50);
      const total = first + second;
      const minimum = Math.min(10, total / 2);

      function move(moveEvent) {
        const delta =
          (vertical ? moveEvent.clientY : moveEvent.clientX) - startPos;
        const next = Math.min(
          Math.max(first + (delta / Math.max(size, 1)) * 100, minimum),
          total - minimum,
        );
        before.style.flex = `${next} 1 0%`;
        after.style.flex = `${total - next} 1 0%`;
      }

      function end() {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", end);
      }

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", end);
    }

    handle.addEventListener("pointerdown", start);
    handle.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 10 : 2;
      const direction =
        event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : event.key === "ArrowRight" || event.key === "ArrowDown"
            ? 1
            : 0;
      if (!direction) return;
      event.preventDefault();
      const first = Number(before.style.flexGrow || 50);
      const second = Number(after.style.flexGrow || 50);
      const next = Math.min(Math.max(first + direction * step, 10), first + second - 10);
      before.style.flex = `${next} 1 0%`;
      after.style.flex = `${first + second - next} 1 0%`;
    });
  });
});
