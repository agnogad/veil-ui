// TagsInput — dependency-free chips with Enter/comma/Backspace handling.
document.querySelectorAll("[data-tags-input]").forEach((root) => {
  const list = root.querySelector("[data-tags-list]");
  const input = root.querySelector("[data-tags-field]");
  if (!list || !input) return;

  const maxTags = 5;
  let tags = ["design", "vue"];

  function removeTag(tag) {
    tags = tags.filter((item) => item !== tag);
    render();
    input.focus();
  }

  function createChip(tag) {
    const chip = document.createElement("span");
    chip.className =
      "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground";
    chip.append(document.createTextNode(tag));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className =
      "rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";
    remove.setAttribute("aria-label", `Remove tag ${tag}`);
    remove.innerHTML =
      '<svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      removeTag(tag);
    });

    chip.append(remove);
    return chip;
  }

  function render() {
    list.innerHTML = "";
    tags.forEach((tag) => list.append(createChip(tag)));
    input.placeholder = tags.length === 0 ? "Add a tag" : "";
  }

  function add(raw) {
    const tag = raw.trim();
    if (!tag) return;
    if (tags.length >= maxTags) return;
    if (tags.includes(tag)) return;
    tags.push(tag);
    input.value = "";
    render();
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      add(input.value);
    } else if (event.key === "Backspace" && input.value === "" && tags.length > 0) {
      event.preventDefault();
      tags = tags.slice(0, -1);
      render();
    }
  });

  input.addEventListener("blur", () => {
    if (input.value.trim()) add(input.value);
  });

  input.addEventListener("paste", (event) => {
    const text = event.clipboardData?.getData("text") ?? "";
    if (!/[,;\n]/.test(text)) return;
    event.preventDefault();
    text.split(/[,;\n]/).forEach(add);
  });

  root.addEventListener("click", () => input.focus());

  render();
});
