// FileUpload — dependency-free file list with size and count limits.
document.querySelectorAll("[data-file-upload]").forEach((root) => {
  const surface = root.querySelector("[data-upload-surface]");
  const input = root.querySelector("[data-upload-input]");
  const error = root.querySelector("[data-upload-error]");
  const list = root.querySelector("[data-upload-list]");
  const footer = root.querySelector("[data-upload-footer]");
  const count = root.querySelector("[data-upload-count]");
  const uploadButton = root.querySelector("[data-upload-button]");
  if (!surface || !input || !list) return;

  const maxSize = Number(root.dataset.maxSize) || Infinity;
  const maxFiles = Number(root.dataset.maxFiles) || Infinity;
  let files = [];

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function showError(message) {
    if (!error) return;
    error.hidden = !message;
    error.textContent = message || "";
  }

  function setDragging(dragging) {
    surface.dataset.dragging = dragging ? "true" : "false";
  }

  function render() {
    list.innerHTML = "";

    files.forEach((file, index) => {
      const row = document.createElement("li");
      row.className = "flex items-center gap-3 rounded-md border px-3 py-2";

      const icon = document.createElement("span");
      icon.className = "shrink-0 text-muted-foreground";
      icon.innerHTML =
        '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/></svg>';

      const meta = document.createElement("div");
      meta.className = "min-w-0 flex-1";
      const name = document.createElement("p");
      name.className = "truncate text-sm font-medium";
      name.textContent = file.name;
      const size = document.createElement("p");
      size.className = "text-xs text-muted-foreground";
      size.textContent = formatBytes(file.size);
      meta.append(name, size);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className =
        "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring";
      remove.setAttribute("aria-label", `Remove ${file.name}`);
      remove.innerHTML =
        '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
      remove.addEventListener("click", () => {
        files = files.filter((item) => item !== file);
        showError("");
        render();
      });

      row.append(icon, meta, remove);
      list.append(row);
    });

    if (footer) footer.hidden = files.length === 0;
    if (count) {
      count.textContent = `${files.length} file${files.length === 1 ? "" : "s"} ready`;
    }
    if (uploadButton) {
      uploadButton.disabled = false;
      uploadButton.textContent = `Upload ${files.length} file${files.length === 1 ? "" : "s"}`;
    }
  }

  function add(incoming) {
    showError("");
    const accepted = Array.from(incoming).filter((file) => file.size <= maxSize);

    if (accepted.length < incoming.length) {
      showError(`Some files were skipped. Each file must be ${formatBytes(maxSize)} or smaller.`);
    }

    for (const file of accepted) {
      const exists = files.some(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      );
      if (!exists) files.push(file);
    }

    if (files.length > maxFiles) {
      files = files.slice(0, maxFiles);
      showError(`Only the first ${maxFiles} files are kept.`);
    }

    render();
  }

  surface.addEventListener("click", () => input.click());

  surface.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      input.click();
    }
  });

  ["dragenter", "dragover"].forEach((type) => {
    surface.addEventListener(type, (event) => {
      event.preventDefault();
      setDragging(true);
    });
  });

  surface.addEventListener("dragleave", () => setDragging(false));

  surface.addEventListener("drop", (event) => {
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer?.files ?? []);
  });

  input.addEventListener("change", () => {
    add(input.files ?? []);
    input.value = "";
  });

  if (uploadButton) {
    uploadButton.addEventListener("click", () => {
      uploadButton.textContent = "Uploaded";
      uploadButton.disabled = true;
    });
  }

  render();
});
