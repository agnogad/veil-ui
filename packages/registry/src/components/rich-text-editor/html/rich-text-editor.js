// Rich Text — minimal formatting toolbar for a contenteditable region.
document.querySelectorAll('[data-slot="rich-text"]').forEach((root) => {
  const editor = root.querySelector('[role="textbox"]');
  const placeholder = root.querySelector("[data-placeholder]");
  if (!(editor instanceof HTMLElement)) return;

  const sync = () => {
    if (placeholder) {
      placeholder.classList.toggle(
        "hidden",
        (editor.textContent ?? "").trim().length > 0,
      );
    }
    root.dispatchEvent(
      new CustomEvent("rich-text-change", {
        bubbles: true,
        detail: { html: editor.innerHTML },
      }),
    );
  };

  root.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("mousedown", (event) => event.preventDefault());
    button.addEventListener("click", () => {
      editor.focus();
      const command = button.getAttribute("data-command");
      if (command) document.execCommand(command);
      sync();
    });
  });

  editor.addEventListener("input", sync);
  sync();
});
