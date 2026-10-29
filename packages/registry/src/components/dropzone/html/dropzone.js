// Dropzone — dependency-free drag-and-drop behavior for [data-dropzone].
document.querySelectorAll("[data-dropzone]").forEach((root) => {
  const surface = root.querySelector("[data-dropzone-surface]");
  const input = root.querySelector("[data-dropzone-input]");
  const output = root.querySelector("[data-dropzone-output]");
  if (!surface || !input) return;

  function setDragging(dragging) {
    surface.dataset.dragging = dragging ? "true" : "false";
  }

  function report(list) {
    if (!list || list.length === 0) return;
    if (output) {
      output.hidden = false;
      output.textContent = `Added: ${Array.from(list)
        .map((file) => file.name)
        .join(", ")}`;
    }
  }

  surface.addEventListener("click", () => input.click());

  surface.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      input.click();
    }
  });

  surface.addEventListener("dragenter", (event) => {
    event.preventDefault();
    setDragging(true);
  });

  surface.addEventListener("dragover", (event) => {
    event.preventDefault();
    setDragging(true);
  });

  surface.addEventListener("dragleave", () => setDragging(false));

  surface.addEventListener("drop", (event) => {
    event.preventDefault();
    setDragging(false);
    report(event.dataTransfer?.files ?? null);
  });

  input.addEventListener("change", () => {
    report(input.files);
    input.value = "";
  });
});
